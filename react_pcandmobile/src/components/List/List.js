import "./List.less"
import {Link} from "react-router-dom"

export class List extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let domList = this.props.list.map(
            ({_id,name,price,discount,img})=>(
                <li className="flt" key={_id}>
                    <Link to={`/detail/${_id}`}>
                        <div className="img-box">
                            <img src={img} />
                        </div>
                        <h3>{name}</h3>
                        <div className="price clr">
                            <p>现价: <span>¥{price.toFixed(2)}</span></p>
                            <p><del>原价:¥{(price*10/discount).toFixed(2)}</del></p>
                        </div>
                    </Link>
                </li>
            )
        )
        
        return (
            <ul className="goods-list clr">
                {domList}
            </ul>
        )
    }
}