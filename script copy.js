$(document).ready(function () {
    $('.color-box').click(function () {
        var color = $(this).attr('id');
        var emptyBox = $('.empty-box.selected');

        if (emptyBox.length > 0) {
            emptyBox.addClass(color);
            emptyBox.removeClass('empty-box');
            emptyBox.addClass('player-box');
            $(".disabled").removeClass('disabled')
        }
    });

    $('.box').click(function () {

        if ($(this).hasClass('player-box')) {
            $(this).removeClass('player-box selected red green blue white');
            $(this).addClass('empty-box');

        } else {
            $(this).addClass('selected');
        }

        if ($("#player1").hasClass('empty-box')) {
            $("#player2").addClass('disabled')
        }

    });
    var players = [
        { id: 1, name: 'Jogador 1', balance: 5000 },
        { id: 2, name: 'Jogador 2', balance: 5000 },
        { id: 3, name: 'Jogador 3', balance: 5000 },
        { id: 4, name: 'Jogador 4', balance: 5000 }
    ];

    updateBalances();

    $('#buy').click(function () {
        processTransaction('compra');
    });

    $('#sell').click(function () {
        processTransaction('venda');
    });

    $('#trade').click(function () {
        processTransaction('troca');
    });

    function processTransaction(transactionType) {
        var amount = parseInt($('#amount').val());
        var player = "";
        if ($('#player1').hasClass('red')) {
            player = 1;
        }
        if ($('#player1').hasClass('green')) {
            player = 2;
        }
        if ($('#player1').hasClass('blue')) {
            player = 3;
        }
        if ($('#player1').hasClass('white')) {
            player = 4;
        }
        var targetPlayer = "";
        if ($('#player2').hasClass('red')) {
            targetPlayer = 1;
        }
        if ($('#player2').hasClass('green')) {
            targetPlayer = 2;
        }
        if ($('#player2').hasClass('blue')) {
            targetPlayer = 3;
        }
        if ($('#player2').hasClass('white')) {
            targetPlayer = 4;
        }
        var transactionText = '';

        if (isNaN(amount) || amount <= 0) {
            alert('Por favor, insira um valor válido.');
            return;
        }
        var currentPlayer = getPlayerById(player);
        var currentTargetPlayer = getPlayerById(targetPlayer);

        if (transactionType === 'compra') {
            transactionText = 'Gastou';
            currentPlayer.balance -= amount;
        }
        else if (transactionType === 'venda') {
            transactionText = 'Recebeu';
            currentPlayer.balance += amount;

        }
        else if (transactionType === 'troca') {
            if (player === targetPlayer) {
                alert('Por favor, selecione jogadores diferentes para a troca.');
                return;
            }
            transactionText = 'Pagou para o jogador ' + targetPlayer;
            currentPlayer.balance -= amount;
            currentTargetPlayer.balance += amount;
        }


        var logEntry = currentPlayer.name + ': ' + transactionText + ' o valor de $' + amount;
        $('#log-list').append('<li>' + logEntry + '</li>');
        console.log(logEntry)
        console.log(currentPlayer.balance)

        updateBalances();

    }

    function updateBalances() {
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            $('#balance-' + player.id).text('$' + player.balance);
        }
    }

    function getPlayerById(id) {
        id = parseInt(id);
        return players.find(function (player) {
            return player.id === id;
        });
    }

});