export const Home = () => {
    return (
        <div>
            <div className='navBar'>
                <ul>
                    <li>Logo</li>
                    <li>About</li>
                    <li>Other Exchanges</li>
                    <li>Wallet</li>
                    <li>Balance</li>
                    <li>Settings</li>
                    <li>Logout</li>
                </ul>
            </div>
            <div className='userData'>
                <ul>
                    <li>UserName</li>
                    <li>Cuenta</li>
                    <li>Saldo</li>
                    <li>otra cosa</li>
                </ul>
            </div>
            <div className='home-container'>
                <div className='home-container_boxLeft'>
                    <div className='crypto-graphics'></div>
                    <div className='home-container_boxLeft--bottom'>
                        <div className='about'></div>
                        <div className='statistics'></div>
                    </div>
                </div>
                <div className='home-container_boxRight'>
                    <div className='crypto-calculator'></div>
                </div>
            </div>
        </div>
    )
}