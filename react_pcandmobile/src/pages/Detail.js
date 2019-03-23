import {connect} from "react-redux"
import { getDetail } from "../actions/actions";

class UI extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        // let goodsID = this.props.match.params.gid
        this.props.init()

        // Axios.get("/zhuiszhu/goods/getGoods",{params:{goodsID}})
        //     .then(({data})=>{
        //         this.setState({
        //             goods: data.goods
        //         })
        //     })
        
    }

    render(){
        let {goods,title} = this.props
        let dom = null
        if(goods){
            let {
                _id,name,price,discount,stock,imgs,detail,banner
            } = goods
            let imgDom = imgs.map((src,i)=><img key={i} src={src} />)
            dom = (
                <div>
                    <img src={banner[0]} />
                    <h3>{name}</h3>
                    <p>价格:{price.toFixed(2)}</p>
                    <p>折扣: {discount}折</p>
                    <p>库存: {stock}件</p>
                    <p>详情: {detail}</p>
                    <div className="detail-img">{imgDom}</div>
                </div>
            )
        }

        return (
            <div className="w1200">
                {title}
                {dom}
            </div>
        )
    }
}
// detail ===> {goods:null}
let mstp = ({detail}) => detail
let mdtp = (dispatch,props) => {
    return {
        init(){
            let goodsID = props.match.params.gid
            dispatch(getDetail(goodsID))
        }
    }
}
export let Detail = connect(mstp,mdtp)(UI)