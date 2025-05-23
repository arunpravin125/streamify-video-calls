// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuthUser } from "../hooks/useAuthUser";
// import { useQuery } from "@tanstack/react-query";
// import { getStreamToken } from "../lib/api";

// import {
//   StreamVideo,
//   StreamVideoClient,
//   StreamCall,
//   CallControls,
//   SpeakerLayout,
//   StreamTheme,
//   CallingState,
//   useCallStateHooks,
// } from "@stream-io/video-react-sdk";

// import "@stream-io/video-react-sdk/dist/css/styles.css";
// import toast from "react-hot-toast";
// import PageLoader from "../components/PageLoader";

// const CallPage = () => {
//   const { ids: callId } = useParams();
//   const navigate = useNavigate();
//   const [client, setClient] = useState(null);
//   const [call, setCall] = useState(null);
//   const [isConnecting, setIsConnecting] = useState(true);
//   const { authUser, isLoading } = useAuthUser();

//   const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

//   const { data: tokenData } = useQuery({
//     queryKey: ["streamToken"],
//     queryFn: getStreamToken,
//     enabled: !!authUser,
//   });

//   useEffect(() => {
//     const initCall = async () => {
//       if (!tokenData?.token || !authUser || !callId) return;

//       try {
//         const user = {
//           id: authUser._id,
//           name: authUser.fullName,
//           image: authUser.profilePic,
//         };

//         const videoClient = new StreamVideoClient({
//           apiKey: STREAM_API_KEY,
//           user,
//           token: tokenData.token,
//         });

//         const callInstance = videoClient.call("default", callId);
//         await callInstance.join({ create: true });

//         setClient(videoClient);
//         setCall(callInstance);
//       } catch (error) {
//         console.error("Error joining call:", error);
//         toast.error("Could not join call. Please try again.");
//       } finally {
//         setIsConnecting(false);
//       }
//     };

//     initCall();
//   }, [tokenData, authUser, callId]);

//   if (isLoading || isConnecting) return <PageLoader />;

//   return (
//     <div className="h-screen flex flex-col items-center justify-center">
//       {client && call ? (
//         <StreamVideo client={client}>
//           <StreamCall call={call}>
//             <CallContent />
//           </StreamCall>
//         </StreamVideo>
//       ) : (
//         <div className="flex items-center justify-center h-full">
//           <p>Could not initialize call. Please refresh or try again later.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const CallContent = () => {
//   const { useCallCallingState } = useCallStateHooks();
//   const callingState = useCallCallingState();
//   const navigate = useNavigate();

//   if (callingState === CallingState.LEFT) {
//     return navigate("/");
//   }

//   return (
//     <StreamTheme>
//       <SpeakerLayout />
//       <CallControls />
//     </StreamTheme>
//   );
// };

// export default CallPage;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams(); // Fixed param name
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {client && call ? (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <CallContent />
          </StreamCall>
        </StreamVideo>
      ) : (
        <div className="text-center text-red-500">
          <p>
            Failed to connect to the call. Please refresh the page or try again
            later.
          </p>
        </div>
      )}
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
