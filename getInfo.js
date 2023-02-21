const Token = process.env['Token']

const { request, gql } = require('graphql-request');

const endpoint = 'https://api.github.com/graphql';
const token = Token.toString();

const query = gql`
  query ($username: String!) {
    user(login: $username) {
      avatarUrl
      bio
      company
      createdAt
      pinnedItems(first: 6) { nodes { ... on Repository { nameWithOwner description stargazerCount forkCount primaryLanguage { name } } ... on Gist { id name description } } totalCount }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      id
      location
      login
      name
      repositories {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      websiteUrl
    }
  }
`;

async function getInfo(username) {
  const variables = { username };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const data = await request(endpoint, query, variables, headers);
  return data;
}

module.exports = { getInfo };
