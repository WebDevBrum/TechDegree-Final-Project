import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

      options.headers['Authorization'] = `Basic ${encodedCredentials} `;
    }
    return fetch(url, options);
  }

  /**
   * Obtains a list of courses from the database (no Auth)
   */
  async getCourses() {
    const response = await this.api('/courses', 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    }
  }

  /**
   * Obtains specific course details from the database (no Auth)
   * @param {number} id 
   */
  async courseDetail(id) {
    const response = await this.api(`/courses/${id}`, 'GET');

    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 404) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  /**
   * Deletes a course on the database (Auth reqd)
   * @param {number} id 
   * @param {string} emailAddress 
   * @param {string} password 
   */
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });

    if (response.status === 204) {
      return [];
    } else if (response.status === 403) {
      return response.json().then(data => { return data.errors })
    }
    else {
      throw new Error();
    }
  }

  /**
   * 
   * @param {object} course 
   * @param {string} emailAddress 
   * @param {string} password 
   */
  async createCourse(course, emailAddress, password) {

    const response = await this.api(`/courses`, 'POST', course, true, { emailAddress, password });

    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * Updates a course on the database , Auth reqd
   * @param {number} id 
   * @param {object} course 
   * @param {string} emailAddress 
   * @param {string} password 
   */
  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password });

    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * Gets a user from the database via signin (Auth reqd)
   * @param {string} emailAddress 
   * @param {string} password 
   */
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });

    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  /**
   * Creates a new user on the database via signup (no Auth)
   * @param {object} user 
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}