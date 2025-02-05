import axios from "axios"
import { useState } from "react"

export const HomePage = () => {
    const API = "https://s.squizee.in/short/formResponse?url=&suffix=&email=&format=json"
    const para = `s.squizee.in/{suffix}-fdyey2y37`
    const [longUrl, setlongUrl] = useState("")
    const [suffix, setsuffix] = useState("")
    const [url, seturl] = useState("Shorter URL")
    const [load, setload] = useState(false)
    const [copyStatus, setCopyStatus] = useState(false);

    const handleGenerateURL = async (e) => {
        e.preventDefault()
        setload(true)
        try{
            const res = await axios.post(`https://s.squizee.in/short/formResponse?url=${encodeURIComponent(longUrl)}&suffix=${suffix}&email=&format=json`)
            seturl(res.data.shortened_url)
        }catch(e){
            alert("Error in generating URL")
        }
        setload(false)
    }
    const handleCopyURL = () => {
        if (url && url !== "Shorter URL") {
          navigator.clipboard.writeText(`https://${url}`)
            .then(() => {
              setCopyStatus(true);
              setTimeout(() => setCopyStatus(false), 2000);
            })
            .catch(() => alert("Failed to copy the URL."));
        } else {
          alert("No URL to copy!");
        }
      };

    return (
        <div className="h-[auto] w-[35vw] border-2 border-blue-700 mx-auto my-[100px] p-5 rounded-xl ">
            <h1 className="text-[35px] font-semibold text-blue-500 text-center ">Link Shortner..</h1>
            <form className="w-[90%] mx-auto " onSubmit={handleGenerateURL}>
                <input type="text" className="h-[auto] w-[90%] border border-blue-500 rounded px-2.5 py-2 text-lg font-semibold outline-blue-400 my-1 " name="longUrl" value={longUrl} onChange={(e) => setlongUrl(e.target.value)} placeholder="Enter your url" required /><br />

                <input type="text" className="h-[auto] w-[90%] border border-blue-500 rounded px-2.5 py-2 text-lg font-semibold outline-blue-400 my-1 " name="suffix" value={suffix} onChange={(e)=> setsuffix(e.target.value)} placeholder="Enter suffix(optinal) " /><br />

                <button type="submit" className="h-auto w-[90%] border border-blue-500 bg-blue-500 px-2 py-1 font-semibold text-white cursor-pointer rounded my-1 text-xl " >{load ? "Generating.." : "Generate URL"} </button>

                <p className="text-[12px] my-1 ">Enter a valid URL in the field above and click "Generate URL" to get a shortened link.</p>
                <p className="text-center text-[12px] ">Format 1: <span className="text-blue-500 cursor-pointer "> s.squizee.in/fdyey2y37</span></p>
                <p className="text-center text-[12px] ">Format 2: <span className="text-blue-500 cursor-pointer ">{para} </span></p>

                <p className="text-[12px] text-center ">Share your shorter link easily!</p>

            </form>
            <div className="w-[90%] mx-auto ">
                <p className="h-[auto] w-[90%] border border-blue-500 rounded px-2.5 py-2 text-[15px] bg-blue-200 font-semibold outline-blue-400 my-1 ">{url}</p>
                <button className="h-auto w-[90%] border border-blue-500 bg-blue-500 px-2 py-1 font-semibold text-white cursor-pointer rounded my-1 text-xl  " onClick={handleCopyURL}  >{copyStatus ? "copied":"Copy URL"} </button>
            </div>
        </div>
    )
}