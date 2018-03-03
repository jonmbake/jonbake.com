$(document).ready(function() {
  const TOPICS = [
    {className: 'java', text: 'Java'},
    {className: 'javascript', text: 'JavaScript'},
    {className: 'medium', text: 'Medium'},
    {className: 'security', text: 'Web Security'},
    {className: 'software_dev', text: 'Software Development'},
    {className: 'sql', text: 'SQL'},
    {className: 'walkthroughs', text: 'Walk Throughs'},
  ];

  const filter = function () {
    const selected = $('.topic-filter').select2("val");
    if (selected.length === 0) {
      $('.posts li').show();
    } else {
      $('.posts li').hide();
      selected.forEach(s => $('.posts li.' + s).show())
    }
  }

  $('.topic-filter').select2({
    placeholder: 'Filter by Topic',
    data: TOPICS.map((t, i) => {
      return {
        id: t.className,
        text: t.text + ' (' + $('.posts li.' + t.className).length + ')'
      }
    })
  }).on('change', filter);
});
