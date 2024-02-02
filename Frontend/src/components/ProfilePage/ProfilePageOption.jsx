import OrderInProfile from "./OrderInProfile";
import ChangePasswordInProfile from "./ChangePasswordInProfile";


const ProfilePageOption = ({ selectedOption }) => {
  if (selectedOption === "option1") {
    return <OrderInProfile />;
  } else if (selectedOption === "option2") {
    return <ChangePasswordInProfile />;
  }
};

export default ProfilePageOption;
