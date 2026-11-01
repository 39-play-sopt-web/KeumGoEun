function NumberCard( { number,onClick } ){
    //받은 함수를 실제 버튼 클릭에 연결
    return(
        <button type="button" onClick={onClick}
        className="w-full aspect-square bg-primary 
        text-neutral-100 rounded-md text-2xl 
        hover:bg-neutral-700 transition-[background-color,filter,scale] duration-150 active:brightness-200 active:scale-85">  
            {number}
        </button>
    );
}

export default NumberCard;
