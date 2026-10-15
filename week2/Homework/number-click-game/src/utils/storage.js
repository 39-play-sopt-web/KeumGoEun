//local storage
export function saveGameRecord(level,playTime) {
    //기존 기록 가져오기 
    const saveRecords = localStorage.getItem("gameRecords"); //getItem: 데이터 가져오기

    //문자열 - 배열로 변환
    const records = saveRecords ? JSON.parse(saveRecords) : [];

    //새 기록 생성
    const newRecord = {
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
