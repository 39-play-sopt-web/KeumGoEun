//헤더
function Header() {
    return (
        <header>
            <h1>숫자 클릭 게임</h1>

            <nav>
                <button type="button">게임</button>
                <button type="button">랭킹</button>
            </nav>

            <select>
                <option>Level 1(3x3)</option>
                <option>Level 2(4x4)</option>
                <option>Level 1(5x5)</option>
            </select>

            <span>0.00초</span>

        </header>
    )
} export default Header;