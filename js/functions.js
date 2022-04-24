$(document).ready(function(){
    $(function(){

        //Função para abertura do menu na visão mobile

        $('#mobile-menu-btn').click(function(){
            $('.header-mobile-menu').slideToggle()
        })

        $(window).resize(function(){
            if($(window).width() > 692){
                $('.header-mobile-menu').fadeOut()
            }
        })

        //Função que realize o scroll

        $('nav a').click(function(){
            var href = $(this).attr('href')
            var home = "#home"

            if(href == home){
                $('html,body').animate({'scrollTop':0})
                
            }
            else{
                var offSetTop = $(href).offset().top
                $('html,body').animate({'scrollTop':offSetTop - 80})
                // - 80 por conta do header fixo
            }

            return false
        })

        //Funções referentes ao slider de testemunhos de usuários

        var currentSliderIndex = 0
        var maximumSliderIndex = $('.slider #user-testimonial').length
        var sliderDelay = 5000

        const initSlider = () =>{
            for(var i = 0; i < maximumSliderIndex; i++){
                if(i == 0){
                    $('#bullet-nav').append('<button style="background-color: black;"></button>')
                }
                else{
                    $('#bullet-nav').append('<button></button>')
                }
            }
            $('#user-testimonial').eq(currentSliderIndex).stop().fadeIn()
            sliderBulletNavigate()
            sliderArrowNavigate()
            setInterval(function(){
                switchSlider()
            }, sliderDelay)
        }

        const switchSlider = () =>{
            $('.slider #user-testimonial').eq(currentSliderIndex).stop().fadeOut()
            $('#bullet-nav button').eq(currentSliderIndex).css('background-color','rgb(206, 206, 206)')
            currentSliderIndex += 1
            if(currentSliderIndex == maximumSliderIndex)
                currentSliderIndex = 0;
            $('.slider #user-testimonial').eq(currentSliderIndex).stop().fadeIn()
            $('#bullet-nav button').eq(currentSliderIndex).css('background-color','black')
        }

        const sliderBulletNavigate = () =>{
            $('#bullet-nav button').click(function(){
                $('.slider #user-testimonial').eq(currentSliderIndex).stop().fadeOut()
                $('#bullet-nav button').eq(currentSliderIndex).css('background-color','rgb(206, 206, 206)')
                currentSliderIndex = $(this).index()
                $('.slider #user-testimonial').eq(currentSliderIndex).stop().fadeIn()
                $('#bullet-nav button').eq(currentSliderIndex).css('background-color','black')
            })
        }

        const sliderArrowNavigate = () =>{
            $('.slider #arrow-left').click(function(){
                $('.slider #user-testimonial').eq(currentSliderIndex).stop().fadeOut()
                $('#bullet-nav button').eq(currentSliderIndex).css('background-color','rgb(206, 206, 206)')
                currentSliderIndex -= 1;
                if(currentSliderIndex < 0)
                    currentSliderIndex = 2
                $('.slider #user-testimonial').eq(currentSliderIndex).stop().fadeIn()
                $('#bullet-nav button').eq(currentSliderIndex).css('background-color','black')
            })
            $('.slider #arrow-right').click(function(){
                $('.slider #user-testimonial').eq(currentSliderIndex).stop().fadeOut()
                $('#bullet-nav button').eq(currentSliderIndex).css('background-color','rgb(206, 206, 206)')
                currentSliderIndex += 1;
                if(currentSliderIndex == maximumSliderIndex)
                    currentSliderIndex = 0
                $('.slider #user-testimonial').eq(currentSliderIndex).stop().fadeIn()
                $('#bullet-nav button').eq(currentSliderIndex).css('background-color','black')
            })
        }

        initSlider()

        //Inserindo máscara no inputs usando o plugin jQuery Masks
        $('#telephone').mask('(00) 00000 - 0000')

        //Função para exibição de mensagem de campos inválidos no form de contato
        const toasterWarning = (message) =>{
            $('#warning p').remove()
            $('#warning').append('<p class="h3">'+message+'</p>')
            $('#warning').fadeIn("slow")
            setTimeout(function(){
                $('#warning').fadeOut("slow")
            }, 5000)
        }

        //Funções para validação de campos do formulário
        const emailVerify = (email) =>{
            if(email.match(/^[\w-\.]+@([\w-])/) == null){
                return false
            }
        }

        const telephoneVerify = (telephone) =>{
            if(telephone.length < 9){
                return false
            }
        }
    
        $('form#contact-form').submit(function(e){
            e.preventDefault()
            var email = $('input[name=email]').val()
            var telephone = $('input[name=telephone]').val()
            if(emailVerify(email) == false){
                toasterWarning("Insira um e-mail válido")
            }
            else{
                if(telephoneVerify(telephone) == false){
                    toasterWarning("Insira um telefone válido")
                }
                else{
                    $(this).unbind('submit').submit()
                    alert("Formulário enviado com sucesso!")
                    location.reload()
                }
            }
        })

        //Função para exibição da notificação
        
        const displayNotication = () =>{
            setTimeout(function(){
                $('#user-notify').fadeIn()
            }, 30000)
        }

        displayNotication()

        //Funções referentes ao pop-up de divulgação
        const openPopUp = () =>{
            $('body').addClass("prevent-scroll")
            $('#modal-container').fadeIn("slow")
        }

        const closePopUp = () =>{
            $('body').removeClass("prevent-scroll")
            $('#modal-container').fadeOut("slow")
        }

        $('div#notification-icon').click(function(){
            openPopUp()
        })

        $('#modal-container').on('click',function(e){
            if(!(($(e.target).closest("#modal").length > 0))){
                closePopUp()
            }
        })

        $('#close-modal-btn').click(function(){
            closePopUp()
        })

        //Funções referentes aos termos de uso e políticas de privacidade

        const openPoliciesModal = () =>{
            $('body').addClass("prevent-scroll")
            $('#policies-modal-container').fadeIn("slow")
        }

        const closePoliciesModal = () =>{
            $('body').removeClass("prevent-scroll")
            $('#policies-modal-container').fadeOut("slow")
        }
    
        $('footer #policies').click(function(){
            openPoliciesModal()
        })

        $('#policies-modal-container').on('click',function(e){
            if(!(($(e.target).closest("#policies-modal").length > 0))){
                closePoliciesModal()
            }
        })

        $('#close-policies-modal-btn').click(function(){
            closePoliciesModal()
        })

    })
})