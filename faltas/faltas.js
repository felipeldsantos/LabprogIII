
$(document).ready(function() {
    // Change card color on click
    $('.card').click(function() {
        var isChecked = $(this).data('checked');
        if (isChecked == 'true') {
            $(this).removeClass('red');
            $(this).data('checked', 'false');
        } else {
            $(this).addClass('red');
            $(this).data('checked', 'true');
        }
    });
    
    // Export CSV file on button click
    $('#export').click(function() {
        var csvContent = "data:text/csv;charset=utf-8,";
        var checkedParticipants = '';
        var uncheckedParticipants = '';

 
        var date = $('#event-date').val()
        var time = $('#event-time').val()
        var local = $('#event-location').val()

        csvContent += date + " " + time + " " + local + "\n\n";

      
        // Get checked and unchecked participants
        $('.card').each(function() {
            var participantType = $(this).data('type');
            var participantName = $(this).find('h3').text();
            var isChecked = $(this).data('checked');
            if (isChecked == 'true') {
                checkedParticipants += participantType + ',' + participantName + '\n';
            } else {
                uncheckedParticipants += participantType + ',' + participantName + '\n';
            }
        });
      
        // Add checked participants to CSV
        if (checkedParticipants != '') {
            csvContent += 'ALUNOS PRESENTES\n';
            csvContent += 'Tipo,Nome\n';
            csvContent += checkedParticipants;
        }
      
        // Add unchecked participants to CSV
        if (uncheckedParticipants != '') {
            csvContent += '\nALUNOS FALTOSOS\n';
            csvContent += 'Tipo,Nome\n';
            csvContent += uncheckedParticipants;
        }
      
        // Download CSV file
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "participantes.csv");
        document.body.appendChild(link);
        link.click();
    });
    
    // Filter participants by type
    $('#participant-type').on('change', function() {
        var selectedType = $(this).val();
        if (selectedType === 'TODOS') {
            $('.card').show();
        } else {
            $('.card').filter("[data-type!='" + selectedType + "']").hide();
            $('.card').filter("[data-type='" + selectedType + "']").show();
        }
    });
  });