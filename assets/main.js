$(function () {

  // root dict. reference
  var root = {};

  // data dict. reference used in rendering
  var data = {
    "url": "/user/1",
    "method": "POST",
    "headers": {
      "X-Header-Name": "Header value",
      "Content-type": "application/json"
    },
    "body": "{\"name\":\"Frank\",\"surname\":\"Cool\",\"city\":\"City\",\"country\":\"183\",\"state\":\"1\",\"timezone\":\"GMT\",\"invoiceEmail\":\"frank.cool.name\",\"company\":\"\",\"street\":\"High Road\",\"street2\":\"\",\"zip\":\"WQ77899\"}"
  };


  // template editor reference
  var editor;
  // results editor reference
  var results;

  // temporary off-load
  var session;

  // temporarily fixed
  var apiUrl = 'http://example.apiary.io';

  // ECT renderer
  var renderer = ECT({
    cache: false,
    root: root
  });

  // function making all the magic
  var render = function () {
    try {
      var context = $.extend(data, {'apiUrl': apiUrl, 'helpers': helpers});
      var html = renderer.render('template', context);
      $('#error-templates').empty();
      $('#error-templates').hide();
      results.html(html);
      setTimeout(function(){
        Prism.highlightAll(document.getElementById('resultArea'));
      }, 100);
    } catch (err) {
        $('#error-templates').html(err.message);
        $('#error-templates').show();
    }
  };

  // on button click, make the render happen
  var $renderButton = $('.renderIt').bind('click', function (e) {
    e.preventDefault();
    // update the template at last
    root['template'] = editor.getSession().getValue();
    render();
  });

  var $resultArea = $('.resultArea');
  var done = false;

  root['template'] = $('.templateText').text();

  $('.codeInside').each(function (i, el) {
    var $el = $(this);
    $.ajax({
      'url': $el.data('src'),
      'dataType' :'text',
      'contentType': 'text/plain;charset=UTF-8',
      'success': function (responseText, status, xhr) {
        var q;
        if (status == 'error') {
        }
        else {
          q = responseText.indexOf('<pre class="jsRunCode"');
          if (q > -1) {
            q = responseText.substr(0, q);
            q += responseText.substr(responseText.lastIndexOf('</pre>\n') + '</pre>\n'.length);
            responseText = q;
          }
          $el.append($('<pre></pre>').text(responseText.replace(/(<pre class="jsRunCode"(.*)<\/pre>)/mg, ''))).parent().append('<span class="useInEditor">Use In Editor above</span>');

          if (done === false) {
            done = true;
            $('#playgroundWrap').addClass('loaded');
            editor.getSession().setValue($el.parent().find('.codeInside').text());
            render();
          }

        }
      }
    });
  });

  editor = ace.edit('templateText');
  results = $('#resultArea');

  editor.setTheme('ace/theme/tomorrow');
  var Mode = ace.require('ace/mode/html').Mode;
  var session = editor.getSession();
  session.setMode(new Mode());
  session.setUseSoftTabs(false);
  session.setUseWrapMode(false);

  editor.getSession().on('change', function () {
    root['template'] = editor.getSession().getValue();
  });

  editor.renderer.setHScrollBarAlwaysVisible(false);
  editor.renderer.setShowPrintMargin(false);
  editor.renderer.setShowGutter(false);
  editor.renderer.setPadding(5);

  render();

  $(document.body).on('click', '.useInEditor', function (e) {
    e.preventDefault();
    var $el = $(this);
    editor.getSession().setValue($el.parent().find('.codeInside').text());
  });
});
