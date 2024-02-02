import { useEffect, useContext, useState } from "react";
import OrderInProfile from "../components/ProfilePage/OrderInProfile";
import ProfileOptions from "../components/ProfilePage/ProfileOptions";
import Title from "../components/Shared/Title";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Store } from "../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Loading from "../components/Shared/Loading";
import { SAVE_USER_ORDERS } from "../Actions";
import ProfilePageOption from "../components/ProfilePage/ProfilePageOption";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [loading, setLoading] = useState();
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    const getUserOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/v1/orders/user/${userInfo._id}`,
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        );
        ctxDispatch({ type: SAVE_USER_ORDERS, payload: data.orders });
        setLoading(false);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    getUserOrders();
  }, []);
  if (loading) return <Loading />;
  return (
    <div>
      <Title title="Profile" />
      <Row>
        <Col md={10}>
          <ProfilePageOption selectedOption={selectedOption} />
        </Col>
        <Col md={2}>
          <ProfileOptions
            selectedOption={selectedOption}
            onOptionChange={handleOptionChange}
          />
        </Col>
      </Row>
    </div>
  );
};
export default ProfilePage;

// import React, { useState } from "react";
// import ProfileOptions from "./ProfileOptions";
// import ProfilePage from "./ProfilePage";

// const UserProfile = () => {
//   const [selectedOption, setSelectedOption] = useState("option1");

//   const handleOptionChange = (value) => {
//     setSelectedOption(value);
//   };

//   return (
//     <div>
//       <ProfileOptions
//         selectedOption={selectedOption}
//         onOptionChange={handleOptionChange}
//       />
//       <ProfilePage selectedOption={selectedOption} />
//     </div>
//   );
// };

// export default UserProfile;
