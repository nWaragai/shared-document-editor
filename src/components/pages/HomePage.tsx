import type { FC } from "react";
import { Link } from "react-router-dom";


export const HomePage: FC = () => {
  
  return (
    <div className="page-background">
      <div className="page-body">
        <h1>This is HomePage</h1>
        <ul>
          <li>
            <Link to="/login">ログインページ</Link>
          </li>
          <li>
            <Link to="/signup">サインアップページ</Link>
          </li>
          <li>
            <Link to="/editor">エディターページ</Link>
          </li>
        </ul>
      </div>

    </div>
  )
}