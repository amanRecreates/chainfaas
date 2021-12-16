import { Link, Redirect } from 'react-router-dom';
import style from './home.module.scss';
function Home() {
    return (
        <div className={style.app}>
            <div className={style.right}></div>
            <div className={style.left}>
                <div className={style.heading}>
                    ChainFaas
                </div>
                <p>
                    The untapped computational power of the current computers as a serverless platform.
                </p>
                <Link className={style.but} to="/login">Get Started</Link>
            </div>
        </div>
    );
}

export default Home;
