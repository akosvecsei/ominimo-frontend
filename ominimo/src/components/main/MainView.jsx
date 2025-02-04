import { useLogout } from '@/hooks/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainView() {

  const navigate = useNavigate();
  const { logout, isLoading } = useLogout();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className='w-full'>
      <div className='h-[70px] flex items-center justify-between' style={{ paddingLeft: '32px' }}>
        <p>Ominimo Blog</p>
        <div style={{ paddingRight: '32px' }} className='cursor-pointer' onClick={ () => logout() }>

            { isLoading ? (
                <svg width="26" height="26" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.825 21.75h10.35c.927 0 1.666-.764 1.566-1.643-.645-5.67-4.491-5.576-4.491-8.107 0-2.531 3.895-2.39 4.49-8.107.094-.88-.638-1.643-1.566-1.643H6.825c-.928 0-1.658.763-1.566 1.643C5.854 9.61 9.75 9.422 9.75 12c0 2.578-3.846 2.438-4.49 8.107-.1.88.638 1.643 1.566 1.643Z"></path>
                    <path fill="#ffffff" stroke="none" d="M16.091 20.25H7.927c-.731 0-.937-.844-.424-1.367 1.24-1.258 3.746-2.159 3.746-3.602V10.5c0-.93-1.781-1.64-2.883-3.15-.182-.249-.164-.6.299-.6h6.69c.394 0 .48.348.3.598-1.086 1.511-2.906 2.217-2.906 3.152v4.781c0 1.431 2.612 2.203 3.769 3.603.466.565.303 1.366-.427 1.366Z"></path>
                </svg>
            ) : (
                <svg width="26" height="26" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 12a.75.75 0 0 1 .75-.75H15V6.375c0-1.5-1.584-2.625-3-2.625H4.875A2.628 2.628 0 0 0 2.25 6.375v11.25a2.628 2.628 0 0 0 2.625 2.625h7.5A2.627 2.627 0 0 0 15 17.625V12.75H8.25A.75.75 0 0 1 7.5 12Z"></path>
                    <path d="m21.53 11.472-3.75-3.75a.75.75 0 0 0-1.06 1.06l2.47 2.47H15v1.5h4.19l-2.47 2.47a.749.749 0 0 0 .526 1.294.75.75 0 0 0 .534-.234l3.75-3.75a.75.75 0 0 0 0-1.06Z"></path>
                </svg>
            )}

            
        </div>
      </div>
    </div>
  );
}

export default MainView;
