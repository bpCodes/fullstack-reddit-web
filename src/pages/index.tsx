import NavBar from "../components/NavBar";
import { withUrqlClient } from 'next-urql';
import {createUrqlClient} from "../utils/createUrqlClient";

const Index = () => (
  <>
    <NavBar/>
    <div>Heeloo</div>

  </>

)

export default withUrqlClient(createUrqlClient)(Index)
