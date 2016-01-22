$(document).ready(init);
var taskCount=0;
var $task;
var $due;
function init(e){
    $('.button1').on('click', handleEntry);
    $('tbody').on('click', '.check', function(e){
      e.stopPropagation();
        $(e.target).closest('tr').addClass('done').children('td:first, td:nth-of-type(2)').css('text-decoration', 'line-through');
    });
    $('tbody').on('click', '.trash',function(e){
        e.stopPropagation();
        var $row = $(this).closest('tr');
        var rowid = $row.attr('id').slice(-1);
        $.post('/tasks', {remindex: rowid}); //who needs put?
        $row.remove();
    });
}

function handleEntry(e){
  e.preventDefault();
  var $tr = $('#template').clone().attr('id', 'task'+taskCount);
  $('tbody').prepend($tr);
  var $checkbox =$('<input>').addClass('check').attr('type', 'checkbox');
  var $button = $('<button>').addClass('btn btn-default trash btn-sm').attr('aria-label', 'Left Align').append('Remove task');
  $('#task'+taskCount+ ' .remove').append($checkbox, $button);
  $.post('/tasks', {task: $('input#item').val(), due: $('input#date').val()}).success(function(data){
      $('#task'+taskCount+ ' .task').append(data[0][taskCount]);
      $('#task'+taskCount+ ' .due').append(data[1][taskCount]);
      $('input').val('');
      taskCount++;
  }).fail(function(error){
    console.log('we failed you bruh');
  });
}  // That's right, 35 lines.
