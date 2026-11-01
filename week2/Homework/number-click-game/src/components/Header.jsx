import { TABS } from "../constant/tab";
const TAB_ITEMS = [
    { value: TABS.GAME, label: "게임" },
    { value: TABS.RANKING, label: "랭킹" },
];

//헤더
function Header({ elapsedTime, currentTab, onTabChange, level, onLevelChange }) {
    return (
        <header className="grid grid-cols-3 items-center px-12 py-4 bg-white border-b border-zinc-200">
            <h1>숫자 클릭 게임</h1>

            <nav className="flex justify-center gap-2">
                {TAB_ITEMS.map((tab) => (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => onTabChange(tab.value)}
                        className={`px-4 py-2 rounded-lg cursor-pointer ${
                            currentTab === tab.value ? "bg-accent font-bold" : "hover:bg-zinc-100"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
            
            <div className="flex items-center justify-end gap-3">
                {currentTab === TABS.GAME && (
                    <>
                
            <select value={level} onChange={(event) => onLevelChange(event.target.value)} className="border border-zinc-200 rounded-lg px-3 py-2">
                <option value="1">Level 1(3x3)</option>
                <option value="2">Level 2(4x4)</option>
                <option value="3">Level 3(5x5)</option>
            </select>

            <span className="bg-yellow-100 px-3 py-2 rounded-lg font-bold">{elapsedTime.toFixed(2)}초</span>
            </>
            )}
            </div>

        </header>
    )
} export default Header;
