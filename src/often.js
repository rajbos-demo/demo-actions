module.exports = async ({github, context, owner, repo, workflow, run_id}) => {
    
    console.log(`beginning`);
    console.log(`on workflow [${workflow}]`);
    const workflowParts = workflow.split('/')
    let workflow_id = workflowParts[workflowParts.length-1]
    
    console.log(`Running on repo [${owner}/${repo}] with workflow_id: [${workflow_id}]`)
          
    try {
        console.log(`Start of the try call`)

        // const runs = await github.rest.actions.getWorkflow({
        //     owner,
        //     repo,
        //     workflow_id
        // });
        // console.log(``)
        // console.log(`Runs: ${JSON.stringify(runs)}`)
        // console.log(``)
        // console.log(`Found [${runs.length}] workflow runs`)
        
        // const runs2 = await github.rest.actions.listWorkflowRunsForRepo({
        //         owner,
        //         repo
        //     },
        //     (response) => console.log(`Response: ${JSON.stringify(response)}`)
        // )        
        // console.log(`Runs2: ${JSON.stringify(runs2)}`)
        let workflow_id
        try {
            const response = await github.request(
                "GET /repos/{owner}/{repo}/actions/runs/{run_id}",
                {owner, repo, run_id}
            )        
            console.log(`Run Response: ${JSON.stringify(response)}`)
            workflow_id = response.data.workflow_id
        }
        catch(err) { 
            console.log(`err: ${err}`)
        }


        try {
            const response = await github.request(
                "GET /repos/{owner}/{repo}/actions/workflows/{workflowId}/runs",
                {owner, repo, workflow_id}
            )        
            console.log(`All runs Response: ${JSON.stringify(response)}`)
        }
        catch(err) { 
            console.log(`err: ${err}`)
        }

        // const runs = await github.rest.actions.listWorkflowRuns({
        //     owner,
        //     repo,
        //     workflow_id
        // });
        
    } catch (error) {
        console.log(`error: ${error}`)
    }

    console.log(`The End`)

  }