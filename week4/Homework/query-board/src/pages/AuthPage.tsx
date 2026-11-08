import { useState } from 'react';

function AuthPage() {
    const [part, setPart] = useState('');

    function handleGoTOBoard() {
        const authorizationcode = localStorage.getItem('authorizationcode');

        if (!authorizationcode) {
            alert('코드가 발급되지 않았습니다. 코드를 발급해주세요.');
            return;
        }
    }

    return (
        <main>
            <h1>PLAY SOPT 게시판</h1>
            <p>파트를 선택하면 코드가 발급됩니다.</p>

            <select 
            aria-label="파트 선택"
            value={part}
            onChange={(event) => setPart(event.target.value)}
            >
                <option value="" disabled hidden>파트를 선택하세요</option>
                <option value="Web">WEB</option>
                <option value="Android">ANDROID</option>
                <option value="iOS">IOS</option>
            </select>

            <button type ="button" disabled={part === ''}>코드 발급</button>
            <button type ="button" onClick={handleGoTOBoard}>게시판 목록 보기</button>

        </main>
    );
}

export default AuthPage;