import {supabase} from 'supabase/supabase';

import {NavBar} from 'components/navBar/navBar'
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
        </div>
        : history.push('/')}
      </div> 
    );
}