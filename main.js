// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지 URL 확인
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 모든 네비게이션 버튼 찾기
    const navButtons = document.querySelectorAll('.nav-button');
    
    // 현재 페이지에 맞는 버튼 활성화
    navButtons.forEach(button => {
        const href = button.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // 메인 페이지에서 스크롤에 따라 헤더 표시/숨김
    const isMainPage = document.body.classList.contains('main-page');
    if (isMainPage) {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');
        const scrollThreshold = 10; // 스크롤 임계값
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > scrollThreshold) {
                // 스크롤 다운
                if (scrollTop > lastScrollTop) {
                    header.classList.add('hidden');
                } else {
                    // 스크롤 업
                    header.classList.remove('hidden');
                }
            } else {
                // 맨 위로 스크롤
                header.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    }

    // 로고 이미지 로드 실패 시 대체 텍스트 표시
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('error', function() {
            this.style.display = 'none';
            const logoLink = this.parentElement;
            const logoArea = logoLink.parentElement;
            if (!logoArea.querySelector('.logo-placeholder')) {
                const placeholder = document.createElement('div');
                placeholder.className = 'logo-placeholder';
                placeholder.textContent = '로고';
                placeholder.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background-color: #f0f0f0; color: #666; border-radius: 4px; font-weight: 600;';
                logoLink.appendChild(placeholder);
            }
        });
    }

    // 부드러운 스크롤 (필요한 경우)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
