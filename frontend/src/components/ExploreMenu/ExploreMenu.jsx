import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu" id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, cumque. Corrupti reiciendis assumenda voluptate facilis amet ipsum consequatur necessitatibus ab!</p>
        <div className="explore-menu-list">
            {menu_list.map((item)=>(
                <div key={item.menu_name} className="explore-menu-list-item" onClick={()=>setCategory((pre)=>pre===item.menu_name?'all':item.menu_name)} >
                    <img src={item.menu_image} alt="" className={category===item.menu_name?'active':''} />
                    <p>{item.menu_name}</p>
                </div>
            ))}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu  