module.exports = async ({github, context, owner, repo, workflow}) => {
    
    const workflowParts = workflow.split('/')
    console.log(`${JSON.stringify(workflowParts)}`)
    const workflow_id = workflowParts[workflowParts.length-1]
    
    console.log(`Running on repo [${owner}/${repo}] with workflow_id: [${workflow_id}]`)

    const issue = await github.rest.issues.get({
        owner: owner,
        repo: repo,
        issue_number: 6,
      })

    console.log(`Issue title: ${JSON.stringify(issue.data.title)}`)
          
    try {
        console.log(`Start of the try call`)
        const creator = context.payload.sender.login
        console.log(`Creator: ${creator}`)

        const runs = await github.rest.actions.getWorkflow({
            owner,
            repo,
            workflow_id
        });
        // const runs = await github.rest.actions.listWorkflowRunsForRepo({
        //     owner,
        //     repo
        // });

        // const runs = await github.rest.actions.listWorkflowRuns({
        //     owner,
        //     repo,
        //     workflow_id
        // });
                    
        console.log(``)
        console.log(`${JSON.stringify(runs)}`)
        console.log(``)
        console.log(`Found [${runs.length}] workflow runs`)
    } catch (error) {
        console.log(`error: ${error}`)
    }

    console.log(`The End`)

  }