import { useState } from "react";

// 랭킹
function RankingBoard() {

    // 저장된 기록 가져오기
    function loadRecords() {
        const savedRecords = localStorage.getItem("gameRecords");

        const records = savedRecords
            ? JSON.parse(savedRecords)
            : [];

        // 플레이 시간 오름차순
        return records.sort((a, b) => a.playTime - b.playTime);
    }

    // 랭킹 기록 상태
    const [records, setRecords] = useState(loadRecords);

    // 랭킹 초기화
    function reset() {
        localStorage.removeItem("gameRecords");
        setRecords([]);
    }

    return (
        <div className="max-w-4xl mx-auto pt-8 px-4">
            <div className="flex items-center justify-between mb-6">
            <h2>★Ranking</h2>

            <button type="button" onClick={reset} className="border border-neutral-200 px-3 bg-red-50 py-1 rounded-md hover:bg-neutral-200 ">
                초기화
            </button>
            </div>

            {records.length === 0 ? (
                <p className="text-center text-zinc-500 mt-12">아직 기록이 없네요. 게임을 플레이 해보세요 ! ^^</p>
            ) : (
                <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <table className="w-full text-center table-fixed">
                    <thead className="bg-yellow-100">
                        <tr>
                            <th className="p-3">순위</th>
                            <th className="p-3">레벨</th>
                            <th className="p-3">플레이 시간</th>
                            <th className="p-3">기록 시간</th>
                        </tr>
                    </thead>

                    <tbody>
                        {records.map((record, index) => (
                            <tr key={index} className="border-b border-zinc-100 last:border-0">
                                <td className="py-3">{index + 1}</td>
                                <td className="py-3">Level {record.level}</td>
                                <td className="py-3">{record.playTime.toFixed(2)}초</td>
                                <td className="py-3">{new Date(record.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </div>
    );
}

export default RankingBoard;
