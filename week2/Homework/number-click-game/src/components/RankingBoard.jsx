import { useState } from "react";

//랭킹
function RankingBoard() {

    //저장된 기록 가져오기
    function loadRecords() {
        const savedRecords = localStorage.getItem("gameRecords");

        const records= savedRecords 
            ? JSON.parse(savedRecords) 
            : [];

        return records.sort((a,b) => a.playTime - b.playTime);
    }

    //랭킹 기록 상태
    const [records] = useState(loadRecords);

    return (
        <div>
            <h2>ranking</h2>
            <button type="button" onClick={reset}>초기화</button>
        
        <table>
            <thead>
                <tr>
                <th>순위</th>
                <th>레벨</th>
                <th>플레이 시간</th>
                <th>기록 시간</th>
                </tr>
            </thead>

            <tbody>
                {records.map((record,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>Level {record.level}</td>
                        <td>{record.playTime.toFixed(2)}초</td>
                        <td>{new Date(record.date).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )

    function reset() {
        localStorage.removeItem("gamerecords");
        setRecords([]);
    }
} export default RankingBoard;
