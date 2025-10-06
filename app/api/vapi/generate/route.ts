import { generateText } from "ai";
import { google } from "@ai-sdk/google"
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
    return Response.json({success: true, data:'THANK YOU'},{status: 200});
}

export async function POST(request: Request){
    const{ type, role, level, techstack, amount, userid } = await request.json();
    
    // Check if userid is a template string and replace with a default if needed
    const actualUserId = userid && !userid.includes('{{') ? userid : 'anonymous-user';
    
    console.log("Received request with userId:", userid);
    console.log("Using actualUserId:", actualUserId);

    try{
        // Generate a unique ID for this interview to prevent duplicates
        const interviewId = `${actualUserId}-${Date.now()}`;

        const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const interview = {
        id: interviewId,
        role, 
        type, 
        level, 
        techstack: techstack.split(','),
        questions: JSON.parse(questions),
        userId: actualUserId,
        finalized: true,
        coverImage: getRandomInterviewCover(),
        createdAt: new Date().toISOString()
    }
    
    console.log("Saving interview with userId:", actualUserId);

    // Check if an interview with this ID already exists to prevent duplicates
    const existingDoc = await db.collection("interviews").doc(interviewId).get();
    
    if (!existingDoc.exists) {
        // Use the interviewId as the document ID to prevent duplicates
        await db.collection("interviews").doc(interviewId).set(interview);
    } else {
        console.log("Interview already exists, skipping duplicate creation");
    }

        return Response.json({success: true},{status: 200});


    } catch(error){
        console.error(error);

        return Response.json({success: false, error},{status: 500});
    }
}