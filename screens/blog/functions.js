$(document).ready(function(){

    //Função para scroll a partir do menu superior

    $('header nav a').click(function(){
        var href = $(this).attr('href')
        var blog = "#blog"

        if(href == blog){
            $('html,body').animate({'scrollTop': 0})
        }
        else{
            var offSetTop = $(href).offset().top
            $('html,body').animate({'scrollTop':offSetTop - 80})
        }

        return false

    })

    //Função para inicialização do slider do topo

    var blogSliderDelay = 5000
    var currentBlogSliderIndex = 0
    var maximumBlogSliderIndex = $('.blog-slider-content').length

    const initBlogSlider = () =>{
        var amount = maximumBlogSliderIndex
        var sizeContainer = 100*amount
        var sizeContent = 100 / amount
        $('.blog-slider-content').css('width', sizeContent+'%')
        $('.slider-content-wrapper').css('width', sizeContainer+'%')
        for(var count = 1; count <= amount; count++){
            if(count == 1){
                $('.blog-slider .bullet-nav').append('<button class="selected"></button>')
            }
            else{
                $('.blog-slider .bullet-nav').append('<button></button>')
            }
        }
    }

    const blogSliderUpdate = () =>{
        setInterval(function(){
            $('.blog-slider .bullet-nav button').eq(currentBlogSliderIndex).removeClass('selected')
            currentBlogSliderIndex += 1
            if(currentBlogSliderIndex == maximumBlogSliderIndex){
                currentBlogSliderIndex = 0
            }
            $('.blog-slider .bullet-nav button').eq(currentBlogSliderIndex).addClass('selected')
            blogSliderNav(currentBlogSliderIndex)
        }, blogSliderDelay)
    }

    const blogSliderNav = (BlogSliderIndex) =>{
        var offSetX = $('.blog-slider-content').eq(BlogSliderIndex).offset().left - $('.slider-content-wrapper').offset().left
        $('.blog-scroll-slider').animate({'scrollLeft': offSetX})
    }

    const blogSliderBulletNav = () =>{
        $('.blog-slider .bullet-nav button').click(function(){
            $('.blog-slider .bullet-nav button').eq(currentBlogSliderIndex).removeClass('selected')
            currentBlogSliderIndex = $(this).index()
            $('.blog-slider .bullet-nav button').eq(currentBlogSliderIndex).addClass('selected')
            blogSliderNav(currentBlogSliderIndex)
        })
    }

    const blogSliderArrowNav = () =>{
        $('.blog-slider .arrow-nav .arrow-left').click(function(){
            $('.blog-slider .bullet-nav button').eq(currentBlogSliderIndex).removeClass('selected')
            currentBlogSliderIndex -= 1
            if(currentBlogSliderIndex < 0){
                currentBlogSliderIndex = maximumBlogSliderIndex - 1
            }
            $('.blog-slider .bullet-nav button').eq(currentBlogSliderIndex).addClass('selected')
            blogSliderNav(currentBlogSliderIndex)
        })
        $('.blog-slider .arrow-nav .arrow-right').click(function(){
            $('.blog-slider .bullet-nav button').eq(currentBlogSliderIndex).removeClass('selected')
            currentBlogSliderIndex += 1
            if(currentBlogSliderIndex == maximumBlogSliderIndex){
                currentBlogSliderIndex = 0
            }
            $('.blog-slider .bullet-nav button').eq(currentBlogSliderIndex).addClass('selected')
            blogSliderNav(currentBlogSliderIndex)
        })
    }

    initBlogSlider()

    blogSliderUpdate()

    blogSliderBulletNav()

    blogSliderArrowNav()

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