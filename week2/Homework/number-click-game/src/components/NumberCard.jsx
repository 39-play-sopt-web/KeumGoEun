function NumberCard( { number,onClick } ){
    //받은 함수를 실제 버튼 클릭에 연결
    return(
        <button type="button" onClick={onClick}
        className="w-full aspect-square bg-red-400 text-neutral-100 rounded-md text-2xl">  
            {number}
        </button>
    );
}

export default NumberCard;
