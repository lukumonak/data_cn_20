import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';
import axios from "axios";











function Medical_eleven() {
    let { placename } = useParams();
    const baseurl = 'http://localhost:4000/api/medical/11KV_MEDICAL'
    const baseurl2 = 'http://localhost:4000/api/fidder/11KV_MEDICAL'
    const [dta, setdta] = useState([])
    const [fdta, setfdta] = useState([])
    const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
const [Datafetch, setDatafetch]=useState(false)



    useEffect(() => {

        const fatchdata=async()=>{
            try{
               const response= await axios.get(baseurl, {
                }).then((response) => {

                    const dataArray = Array.isArray(response.data) ? response.data : [response.data];
                    setdta(dataArray)
                    setLastUpdateTime(Date.now());
                    console.log(lastUpdateTime);
                    setDatafetch(true)
                    const difference=Date.now()-lastUpdateTime;
                    console.log('difference',difference)
                    if (difference<40000) {
                        setDatafetch(false)
                        console.log(Datafetch)
                    }
                    else{
                        setDatafetch(true)
                    }
                    console.log("Time difference:", Date.now() - lastUpdateTime);
                    console.log("Time:", Date.now());
                })
            }catch(err){
                console.error(err);
            setDatafetch(false)

            }


            try {
                const response = await axios.get(baseurl2, {
                }).then((response) => {
                    const dataArray = Array.isArray(response.data) ? response.data : [response.data];
                    setfdta(dataArray)
                })
            } catch (err) {
                console.error(err);
            }


        };
        fatchdata ();
       
       const intervalid=setInterval(fatchdata,20000)  //for intervel of 10s
       
    //    let dta=Array.dta
        console.log(dta)

        // return ()=>clearInterval(intervalid)

    }, [])


   
   
   






    return (
<>

        <Table striped bordered hover size="sm"  style={{border:"2px solid black",  margin: '20px'}}>
            <thead>
                <tr>
                <th><div style={{ borderRadius: "50%", height: "14px", width: '14px', background:Datafetch?"green":"red"}}></div></th>
                <th><b>R-Y</b></th>
                    <th><b>Y-B</b></th>
                    <th><b>B-R</b></th>


                </tr>
            </thead>
            <tbody >
                {
                   Array.isArray(dta) &&  dta.map((item, index) => (
                        <>
                            {console.log(item)}


                            <tr>
                                <td><b>VOL</b></td>
                                <td>{item.VOL_R_Y}</td>
                                <td>{item.VOL_Y_B}</td>
                                <td>{item.VOL_B_R}</td>
                            </tr>
                            <tr>
                                <td><b>AMP</b></td>
                                <td>{item.AMP_L1}</td>
                                <td>{item.AMP_L2}</td>
                                <td>{item.AMP_L3}</td>
                            </tr>
                            <tr>
                                <td><b>MW</b></td>
                                <td>{item.MW}</td>
                                <td> </td>
                                <td> </td>
                            </tr>
                            <tr>
                                <td><b>PF</b></td>
                                <td>{item.PF}</td>
                                <td> </td>
                                <td> </td>
                            </tr>
                            <tr>
                                <td><b>Free</b></td>
                                <td>{item.FREQUENCY}</td>
                                <td> </td>
                                <td> </td>
                            </tr>
                        </>
                    ))
                }
            </tbody>
        </Table>


{
    Array.isArray(fdta) && fdta.map((item, index) => (
        <div className="feeder" id="fd1" style={{ backgroundColor: item.status === 2 ? 'red' : 'green', border: "2px solid black", height: "30px", width: "30px" }}></div>
    ))
}
</>
    );
}

export default Medical_eleven;