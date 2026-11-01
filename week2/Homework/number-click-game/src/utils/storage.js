//local storage
export function saveGameRecord(level,playTime) {
    const records = getGameRecords();

    //새 기록 생성
    const newRecord = {
        //고유 id 
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        level: level,
        playTime: playTime
    };

    records.push(newRecord);

    //배열 - 문자열로 변환 후 저장 
    localStorage.setItem(
        "gameRecords",
        JSON.stringify(records)
    );

}

// 저장된 기록 조회
export function getGameRecords() {
    try {
        const savedRecords = localStorage.getItem("gameRecords");

        if (!savedRecords) {
            return [];
        }
        const records = JSON.parse(savedRecords);
        if (!Array.isArray(records)) {
            return [];
        }

        const hasMissingId = records.some((record) => !record.id);

        if (!hasMissingId) {
            return records;
        }

        const updatedRecords = records.map((record) => ({
            ...record,
            id: record.id ?? crypto.randomUUID(),
        }));

        localStorage.setItem("gameRecords", JSON.stringify(updatedRecords));

        return updatedRecords;
    } catch (error) {
        console.error("기록을 불러오지 못했어요", error);
        return [];
    }
}

//저장된 기록 삭제
export function clearGameRecords() {
    localStorage.removeItem("gameRecords");
}

