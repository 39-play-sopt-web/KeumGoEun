import { useState, useRef, useEffect } from "react";

function useTimer() {
    // 경과 시간
    const [elapsedTime, setElapsedTime] = useState(0);

    // 타이머가 실행 중인지
    const [isRunning, setIsRunning] = useState(false);

    // 게임이 시작된 시간
    const startTimeRef = useRef(null);

    // 타이머 시작 함수
    function startTimer() {
        startTimeRef.current = performance.now();
        setElapsedTime(0);
        setIsRunning(true);
    }

    // 타이머 종료 함수
    function stopTimer() {
        if (startTimeRef.current === null) {
            return;
        }

        const finalTime =
            (performance.now() - startTimeRef.current) / 1000;

        setElapsedTime(finalTime);
        setIsRunning(false);
        startTimeRef.current = null;

        return finalTime;
    }

    // 타이머 초기화
    function resetTimer() {
        setIsRunning(false);
        setElapsedTime(0);
        startTimeRef.current = null;
    }

    // 시간이 흐르는 동안 업데이트
    useEffect(() => {
        if (!isRunning) {
            return;
        }

        const timerId = setInterval(() => {
            if (startTimeRef.current === null) {
                return;
            }

            const elapsed =
                (performance.now() - startTimeRef.current) / 1000;

            setElapsedTime(elapsed);
        }, 10);

        return () => clearInterval(timerId);
    }, [isRunning]);

    return {
        elapsedTime,
        startTimer,
        stopTimer,
        resetTimer,
    };
}

export default useTimer;