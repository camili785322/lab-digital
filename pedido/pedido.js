document.addEventListener('DOMContentLoaded', () => {
    
   
    const activeStep = 1; 

   
    function changeStep(targetStep) {
        
       
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) <= targetStep) {
                 step.classList.add('active');
            }
        });

        
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetElement = document.getElementById(`step-${targetStep}`);
        if (targetElement) {
             targetElement.classList.add('active');
        } else {
             console.error(`Elemento com ID step-${targetStep} não encontrado!`);
        }
    }

    document.querySelectorAll('.next-step-btn').forEach(button => {
        button.addEventListener('click', () => {
            changeStep(parseInt(button.dataset.target));
        });
    });

    
    document.querySelectorAll('.prev-step-btn').forEach(button => {
        button.addEventListener('click', () => {
            changeStep(parseInt(button.dataset.target));
        });
    });


    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            const optionType = this.dataset.option;
            
            document.querySelectorAll(`.option-card[data-option="${optionType}"]`).forEach(c => {
                c.classList.remove('selected');
            });
            
            
            this.classList.add('selected');
            
        });
    });

    
    changeStep(activeStep); 

    console.log("Script pedido.js carregado com sucesso.");
});
    