function NumberCard( { number,onClick } ){
    //받은 함수를 실제 버튼 클릭에 연결
    return(
        <button type="button" onClick={onClick}
        className="w-full aspect-square bg-rose-400 
        text-neutral-100 rounded-md text-2xl 
        hover:bg-neutral-700 transition-all active:brightness-200 active:scale-85">  
            {number}
        </button>
    );
}

export default NumberCard;
