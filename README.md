# override-with-secrets-action
A GitHub action for replacing the values in json with GitHub secrets. It can be used for accepting the instructions on providing specific credentials for shell script in the job, via GitHub workflow inputs.

## HOW TO MAKE CHANGES TO SOURCE - Steps to follow

1. cd .github/actions/override-with-secrets-action

2. (optional) make required changes in .github/actions/override-with-secrets-action/src/index.js

3. npm i

4. npm run build

5. push the newly generated .github/actions/override-with-secrets-action/dist/index.js

## HOW TO USE
Code snippet for using the action in workflow

      - name: Checkout Source
        with:
          persist-credentials: false
        uses: actions/checkout@v3

      - name: aws-ssm-to-env
        uses: ./.github/actions/override-with-secrets-action
        with:
          jsonString: '{
                    "ADMIN_PASSWORD": "placeholder",
                    "ANOTHER_PASSWORD": "placeholder",
                  }',
          value: ${{ secrets.ADMINPASS }}       

      - name: log envs
        env:
          output_secrets_override: ${{ env.output_secrets_override }}
        run: |
          echo $output_secrets_override
