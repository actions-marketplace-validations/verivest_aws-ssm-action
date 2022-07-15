# AWS SSM action

Given an AWS SSM variable in the format of a `.env` file, this actions parses the `.env` variables and sets them as github workflow environment variables.

## Inputs

| Parameters | Required | Description                                      |
| ---------- | -------- | ------------------------------------------------ |
| `ssm-path` | true     | AWS SSM variable in the format of a `.env` file. |

## Example:

```yml
- uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: ${{ secrets.AWS_SSM_REGION }}

- uses: verivest/aws-ssm-action
  with:
    ssm-path: /env/${{github.event.inputs.environment}}/web

- run: echo "$YOUR_ENV_VAR"
```
