import "./MobileBanner.less"

import { Carousel } from 'antd';


export class MobileBanner extends React.Component {
    constructor(props) {
        super(props)
    }

    // componentDidMount(){
    //     this.swiper = new Swiper(".swiper-container",{
    //         autoplay : true
    //     })
    // }

    // componentDidUpdate(){
    //     this.swiper.update()
    // }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        };
        let domList = this.props.list.map(
            ({ goodsID, banner }) => (
                <div key={goodsID}><img src={banner} /></div>
            )
        )
        // let domList = this.props.list.map(
        //     ({ goodsID, banner }) => (
        //         <div>{goodsID}</div>
        //     )
        // )

        return (
            // <div>
            // {domList}
            // </div>
            <div className="carousel">
                <Carousel {...settings}>
                    {domList}
                </Carousel>
            </div>
        )
    }
}