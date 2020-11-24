import React from 'react'
import OriginalLogo from './Photos/OriginalLogo.jpg'
import Motivation from './Photos/Motivation.jpg'
import Nalin from './Photos/NALIN.jpeg'
export default function AboutUsScreen() {
    return (
        <div>
            <div className="aboutUs aboutUstitle">
            <center><h1 style={{fontSize:"4rem"}}><b>About Us</b></h1></center>
            <center><h1>😇<i>A Hand to the needy.</i>😇</h1></center>
            <center><h3><i>"One man's trash is another man's treasure"</i></h3></center><br/>
            </div>

            <div className="aboutUs aboutUsLeftImg row top">
                <div className="col-1">
                <img src={OriginalLogo} className="aboutUs" alt="Purpose" />
                </div>
                <div className="col-2 aboutUsText aboutUs">
                <center><h1>Purpose</h1></center>
                <p style={{fontSize:"2rem"}}>
                😀 <i>This is a donation website in which all people who had extra items which are no longer useful to them and want to 
                    donate it, this is the platform where you can donate any of your unused items to the needy at no cost!!!</i>🤝
                    <br/>
                    <br/>
                    😃<i>In this platform those who are in need of these goods and those who are ready to donate them come together and then
                    needy could contact to the doner and would collect it from them making shure only the person needy and to whome you want to 
                    donate gets your donation.</i>🤗
                </p>
                </div>
            </div>
            

            <div className="aboutUs aboutUsRightImg row top">
                <div className="aboutUs col-2 aboutUsText">
                    <center><h1>Motivation</h1>
                    <i>To Help the needy.</i></center><br/>
                    <p>
                        😀We usually have things that had gone useless to us but is still in working condition and then we have an idea to
                        give this thing to a person who dont have it and is in need of it. But, the main question arrises that where to find 
                        that person?🤔 So, we just give to any person who is ready to take and may not be in need of it or give to kabadi wala.🤨 
                        But, think again that if it cound react to a person in need then how much helpful could that thing actually become...🥺
                        <br/> 
                        👨‍🏫Seeing this problem that the people who have extra things and willing to donate them but cant find the person who
                        is actually in need to to thing and that thing is usually end up in tash instead or to a person who may not actually
                        need it.🥳
                        <br/><br/>
                        <center>🤩<i>
                        So, we come up with an ide of creating an online portal to tell the needy person that where they could find
                        the things they need. 
                        </i>🤩</center>
                    </p>
                </div>
                <div className="aboutUs col-1">
                    <img src={Motivation} className="aboutUs" alt="Motivation" />
                </div>
            </div>

            <div className="aboutUs aboutUsLeftImg row top">
                <div className="aboutUs col-1">
                    <img src={Nalin} className="center" alt="Nalin" />
                </div>
                <div className="aboutUs col-2 aboutUsText">
                    <h1 >👨‍💻About the Creator</h1>
                    <br/>
                    <h3>Name: Nalin Agrawal</h3>
                    <h3>Branch: C.S.E.</h3>
                    <h3>Institute: Indian Institue of Information Technology, Pune</h3>
                </div>
            </div>
    </div>
    )
}
