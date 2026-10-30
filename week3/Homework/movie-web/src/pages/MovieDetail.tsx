import { Link, useParams } from 'react-router-dom';

function MovieDetail () {
    const { movieId } = useParams();
    return (
        <div>
            <Link to="/">← 목록으로 돌아가기</Link>

            <h1>영화 상세 페이지</h1>

            <p>선택한 영화 ID: {movieId} </p>

        </div>

    )
}

export default MovieDetail;
