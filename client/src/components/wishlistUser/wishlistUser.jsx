import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./wishlistUser.css";

const WishlistUser = () => {

  const [wishlist, setWishlist] = useState([]);
  const user = useSelector(store => store.userState.userLogin)

	const capitalize = (string) => {
		return string.substring(0, 1).toUpperCase() + string.substring(1);
  }; 
  
  const getWishlist = async (id) => {
    await axios.get(`http://localhost:3001/wishlist/user/${id}`, {withCredentials: true})
      .then((res) => {       
        setWishlist(res.data)
      })
  }

  useEffect(() => {
    getWishlist(user.id)
  }, [])

	return (
		<div>			
			<div className="tablaProd">
				<table className="table table-hover ">
					<thead>
						<tr className="table table-hover">
							<th>Id</th>
							<th>Nombre</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{wishlist[0] &&
							wishlist.map((ele) => (
								<tr>
									<td>{ele.id}</td>
									<td>{capitalize(ele.name)}</td>
									<td className="table w-auto table-hover">
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default WishlistUser;
