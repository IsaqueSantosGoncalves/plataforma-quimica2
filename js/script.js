document.addEventListener('DOMContentLoaded', () => {

    /* ================================================
       1. NAVEGAÇÃO ENTRE ABAS
       ================================================ */
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-target');

            // Remove a classe 'active' de todos os botões e esconde os conteúdos
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Ativa o botão clicado
            button.classList.add('active');

            // Exibe a aba correspondente
            const activeTab = document.getElementById(targetTab);
            if (activeTab) {
                activeTab.classList.add('active');
            }

            // Rola suavemente para o topo do conteúdo ao trocar de aba
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });


    /* ================================================
       2. VERIFICAÇÃO DO GABARITO DO QUIZ
       ================================================ */
    const btnGabarito = document.getElementById('btn-gabarito');

    if (btnGabarito) {
        btnGabarito.addEventListener('click', () => {
            const questionCards = document.querySelectorAll('.question-card');
            let respondidas = 0;

            questionCards.forEach(card => {
                const respostaCorreta = card.getAttribute('data-resposta-correta');
                const explicacao = card.getAttribute('data-explicacao') || '';
                const feedbackDiv = card.querySelector('.feedback');
                
                // Busca o input selecionado da questão atual
                const opcaoSelecionada = card.querySelector('input[type="radio"]:checked');

                if (opcaoSelecionada) {
                    respondidas++;
                    const respostaUsuario = opcaoSelecionada.value.toLowerCase();

                    // Limpa classes anteriores
                    feedbackDiv.classList.remove('correto', 'incorreto');

                    if (respostaUsuario === respostaCorreta.toLowerCase()) {
                        feedbackDiv.classList.add('correto');
                        feedbackDiv.innerHTML = `<strong>Resposta Correta! 🎉</strong><br>${explicacao}`;
                    } else {
                        feedbackDiv.classList.add('incorreto');
                        feedbackDiv.innerHTML = `<strong>Resposta Incorreta. ❌</strong><br>A alternativa correta é a <strong>(${respostaCorreta.toUpperCase()})</strong>.<br>${explicacao}`;
                    }
                } else {
                    // Caso o usuário não tenha selecionado nenhuma opção nesta questão
                    feedbackDiv.classList.remove('correto', 'incorreto');
                    feedbackDiv.classList.add('incorreto');
                    feedbackDiv.innerHTML = `<strong>Atenção:</strong> Você não respondeu esta questão!`;
                }
            });

            // Se pelo menos uma questão foi respondida, rola um pouco para baixo para ver os feedbacks
            if (respondidas > 0) {
                btnGabarito.textContent = "Refazer / Atualizar Gabarito";
            }
        });
    }

});