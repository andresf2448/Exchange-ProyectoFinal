import {supabase} from 'supabase/supabase';

import {NavBar} from 'components/navBar/navBar'
import {ShowUserData} from 'components/showUserData/showUserData'
import { useHistory } from "react-router";

import './home.scss';

export const Home = () => {
    const history = useHistory();
    const session = supabase.auth.session();

    return (
      <div>
        {session ? 
          <div>
            <NavBar />
            <ShowUserData/>
        </div>
        : history.push('/')}
      </div> 
    );
}