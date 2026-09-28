(function () {
  "use strict";

  var archive = document.querySelector(".archive");
  if (!archive) return;

  var form = archive.querySelector(".archive-controls");
  var search = archive.querySelector("#archive-search");
  var category = archive.querySelector("#archive-category");
  var year = archive.querySelector("#archive-year");
  var status = archive.querySelector("#archive-results");
  var jump = archive.querySelector(".archive-jump");
  var empty = archive.querySelector("#archive-empty");
  var groups = Array.prototype.slice.call(archive.querySelectorAll("[data-archive-group]"));
  var entries = Array.prototype.slice.call(archive.querySelectorAll("[data-archive-post]"));
  var indexPromise = null;
  var sequence = 0;

  function normalize(value) {
    return (value || "")
      .toLocaleLowerCase("ca")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function getIndex() {
    if (!indexPromise) {
      indexPromise = fetch(archive.getAttribute("data-search-index"))
        .then(function (response) {
          if (!response.ok) throw new Error("No s'ha pogut carregar l'índex");
          return response.json();
        });
    }
    return indexPromise;
  }

  function update() {
    var currentSequence = ++sequence;
    var query = normalize(search.value);
    var terms = query.split(/\s+/).filter(Boolean);
    var selectedCategory = category.value;
    var selectedYear = year.value;
    var hasFilters = terms.length > 0 || Boolean(selectedCategory) || Boolean(selectedYear);
    var searchableTextByUrl = null;

    function applyFilter() {
      if (currentSequence !== sequence) return;
      var visibleTotal = 0;

      entries.forEach(function (entry) {
        var link = entry.querySelector("h3 a");
        var url = link ? link.getAttribute("href") : "";
        var metadata = normalize(entry.getAttribute("data-search") + " " + entry.textContent);
        var fullText = searchableTextByUrl && searchableTextByUrl[url] ? searchableTextByUrl[url] : "";
        var text = metadata + " " + fullText;
        var matchesText = terms.every(function (term) { return text.indexOf(term) !== -1; });
        var categories = (entry.getAttribute("data-categories") || "").split(/\s+/);
        var matchesCategory = !selectedCategory || categories.indexOf(selectedCategory) !== -1;
        var matchesYear = !selectedYear || entry.getAttribute("data-year") === selectedYear;
        var visible = matchesText && matchesCategory && matchesYear;

        entry.hidden = !visible;
        if (visible) visibleTotal += 1;
      });

      groups.forEach(function (group, index) {
        var groupEntries = group.querySelectorAll("[data-archive-post]");
        var visibleInGroup = Array.prototype.some.call(groupEntries, function (entry) { return !entry.hidden; });
        group.hidden = !visibleInGroup;
        if (hasFilters) {
          group.open = visibleInGroup;
        } else {
          group.open = index === 0;
        }
      });

      empty.hidden = !hasFilters || visibleTotal !== 0;
      status.hidden = !hasFilters;
      jump.hidden = !hasFilters || visibleTotal === 0;
      status.textContent = "Mostrant " + visibleTotal + (visibleTotal === 1 ? " article" : " articles");
    }

    if (query.length >= 2) {
      status.hidden = false;
      jump.hidden = true;
      status.textContent = "Cercant dins dels articles…";
      getIndex().then(function (posts) {
        var index = Object.create(null);
        posts.forEach(function (post) { index[post.url] = normalize(post.text); });
        searchableTextByUrl = index;
        applyFilter();
      }).catch(function () {
        searchableTextByUrl = null;
        applyFilter();
        status.textContent += " (cerca limitada a títols i etiquetes)";
      });
    } else {
      applyFilter();
    }
  }

  form.addEventListener("submit", function (event) { event.preventDefault(); });
  form.addEventListener("reset", function () { window.setTimeout(update, 0); });
  search.addEventListener("input", update);
  category.addEventListener("change", update);
  year.addEventListener("change", update);

  archive.classList.add("archive-ready");
  update();
}());