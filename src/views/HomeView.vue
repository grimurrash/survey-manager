<template>
  <div>
    <div v-if="surveyInfo.backgroundImage" class="background-image-container">
      <img class="background-image" :style="backgroundImageStyles" :src="surveyInfo.backgroundImage" alt="Фон">
      <div class="background-image-overlay" :style="backgroundOverlayStyles"></div>
    </div>

    <div class="container shadow my-md-4 p-4">
      <header>
        <div class="pb-2 text-center">
          <h1>Классный руководитель Московской школы</h1>
          <div class="text-center">
            <p>Уважаемые коллеги!</p>
            <p>В рамках повышения эффективности воспитательного процесса и формирования экспертного сообщества классных
              руководителей в образовательных организациях города Москвы просим ответить Вас на несколько вопросов.</p>
          </div>
        </div>
      </header>
      <main>
        <form
          v-if="formStep === 1"
          id="survey-form-step-1"
          class="needs-validation"
          :class="{'was-validated': FirstStepFormValidated}"
          novalidate>
          <div class="mt-4">
            <label for="organizationName">1. Краткое наименование Вашей образовательной организации (ОО) *</label>
            <input type="text"
                   class="form-control mt-2"
                   id="organizationName"
                   required=""
                   v-model="formData.organizationName">
          </div>
          <div class="mt-4">
            <label>2. Опишите основные критерии, используемые Вами при выборе кандидатов на
              исполнение обязанностей классного руководителя</label>
            <div class="row">
              <div class="col-md-4">
                <input type="text"
                       class="form-control mt-2"
                       id="criteria1"
                       required=""
                       v-model="formData.criteria1">
              </div>
              <div class="col-md-4">
                <input type="text"
                       class="form-control mt-2"
                       id="criteria2"
                       required=""
                       v-model="formData.criteria2">
              </div>
              <div class="col-md-4">
                <input type="text"
                       class="form-control mt-2"
                       id="criteria3"
                       required=""
                       v-model="formData.criteria3">
              </div>
            </div>
          </div>

          <div class="mt-4">
            <label class="mb-2">3. Ключевые достижения/профессиональные компетенции, определяющие, на Ваш
              взгляд, высокую квалификацию классного руководителя</label>
            <div class="row">
              <div class="col-md-4">
                <input type="text"
                       class="form-control mt-2"
                       id="achievement1"
                       required=""
                       v-model="formData.achievement1">
              </div>
              <div class="col-md-4">
                <input type="text"
                       class="form-control mt-2"
                       id="achievement2"
                       required=""
                       v-model="formData.achievement2">
              </div>
              <div class="col-md-4">
                <input type="text"
                       class="form-control mt-2"
                       id="achievement3"
                       required=""
                       v-model="formData.achievement3">
              </div>
            </div>
          </div>
          <div class="mt-4">
            <label class="mb-2" for="events">4. Какие мероприятия Вы считаете наиболее эффективными в развитии
              профессиональных компетенций классных руководителей*</label>
            <div class="row row-cols-lg-2 g-3">
              <div class="form-check col">
                <input class="form-check-input" type="checkbox" :required="isRequiredEvent" v-model="events.events1"
                       id="events1">
                <label class="form-check-label" for="events1">
                  Программы повышения квалификации
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" :required="isRequiredEvent" v-model="events.events2"
                       id="events2">
                <label class="form-check-label" for="events2">
                  Тренинги/семинары (в том числе выездные)
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" :required="isRequiredEvent" v-model="events.events3"
                       id="events3">
                <label class="form-check-label" for="events3">
                  Конкурсы профессионального мастерства
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" :required="isRequiredEvent" v-model="events.events4"
                       id="events4">
                <label class="form-check-label" for="events4">
                  Фестивали
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" :required="isRequiredEvent" v-model="events.events5"
                       id="events5">
                <label class="form-check-label" for="events5">
                  Профессиональные клубы для классных руководителей
                </label>
              </div>
              <div class="d-flex">
                <label for="events6" class="col-2 col-form-label">Другое:</label>
                <div class="col-10">
                  <input type="text"
                         class="form-control mt-1"
                         id="events6"
                         :required="isRequiredEvent"
                         v-model="events.events6">
                </div>
              </div>
            </div>
            <input
              class="d-none"
              id="events"
              required
              :value="!isRequiredEvent ? 'req' : ''">
            <div class="invalid-feedback">
              Пожалуйста, выберите тип мероприятий
            </div>
          </div>
          <br>

          <div class="row row-cols-lg-2 g-3">
            <div class="px-4">
              <button class="btn btn-info btn-lg w-100" type="submit" @click.prevent="backStep">
                Назад
              </button>
            </div>
            <div class="px-4">
              <button class="btn btn-primary btn-lg w-100" type="submit" @click.prevent="nextSecondStep">
                Далее
              </button>
            </div>
          </div>
        </form>

        <form
          id="survey-form-step-2"
          class="needs-validation"
          :class="{'was-validated': SecondStepFormValidated}"
          novalidate
          v-else-if="formStep === 2">
          <hr>
          <h4>Классный руководитель начальной школы (1-4 классы)</h4>
          <p>Просим Вас указать классных руководителей – лидеров Вашей ОО, рекомендуемых Вами для приглашения в
            экспертные группы ДОНМ (по 3 для каждой ступени образования)</p>

          <div class="row row-cols-lg-3 g-3 mt-4">
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">1. ФИО</label>
              <input type="text"
                     class="form-control"
                     id="person1fio"
                     required=""
                     v-model="formData.person1fio">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Должность</label>
              <input type="text"
                     class="form-control"
                     id="person1post"
                     required=""
                     v-model="formData.person1post">
            </div>
            <div></div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Стаж педагогической деятельности</label>
              <input type="text"
                     class="form-control"
                     id="person1experience"
                     required=""
                     v-model="formData.person1experience">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Адрес электронной почты</label>
              <input type="email"
                     class="form-control"
                     id="person1email"
                     required=""
                     v-model="formData.person1email">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Номер телефона</label>
              <input type="text"
                     class="form-control"
                     id="person1phone"
                     required=""
                     v-model="formData.person1phone">
            </div>
          </div>
          <div class="row row-cols-lg-3 g-3 mt-4">
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">2. ФИО</label>
              <input type="text"
                     class="form-control"
                     id="person2fio"
                     required=""
                     v-model="formData.person2fio">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Должность</label>
              <input type="text"
                     class="form-control"
                     id="person2post"
                     required=""
                     v-model="formData.person2post">
            </div>
            <div></div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Стаж педагогической деятельности</label>
              <input type="text"
                     class="form-control"
                     id="person2experience"
                     required=""
                     v-model="formData.person2experience">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Адрес электронной почты</label>
              <input type="email"
                     class="form-control"
                     id="person2email"
                     required=""
                     v-model="formData.person2email">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Номер телефона</label>
              <input type="text"
                     class="form-control"
                     id="person2phone"
                     required=""
                     v-model="formData.person2phone">
            </div>
          </div>
          <div class="row row-cols-lg-3 g-3 mt-4">
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">3. ФИО</label>
              <input type="text"
                     class="form-control"
                     id="person3fio"
                     required=""
                     v-model="formData.person3fio">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Должность</label>
              <input type="text"
                     class="form-control"
                     id="person3post"
                     required=""
                     v-model="formData.person3post">
            </div>
            <div></div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Стаж педагогической деятельности</label>
              <input type="text"
                     class="form-control"
                     id="person3experience"
                     required=""
                     v-model="formData.person3experience">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Адрес электронной почты</label>
              <input type="email"
                     class="form-control"
                     id="person3email"
                     required=""
                     v-model="formData.person3email">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Номер телефона</label>
              <input type="text"
                     class="form-control"
                     id="person3phone"
                     required=""
                     v-model="formData.person3phone">
            </div>
          </div>

          <br>

          <div class="row row-cols-lg-2 g-3">
            <div class="px-4">
              <button class="btn btn-info btn-lg w-100" type="submit" @click.prevent="backStep">
                Назад
              </button>
            </div>
            <div class="px-4">
              <button class="btn btn-primary btn-lg w-100" type="submit" @click.prevent="nextThirdStep">
                Далее
              </button>
            </div>
          </div>
        </form>

        <form
          id="survey-form-step-3"
          class="needs-validation"
          :class="{'was-validated': ThirdStepFormValidated}"
          novalidate
          v-else-if="formStep === 3">
          <hr>
          <h4>Классный руководитель основной школы (5-9 классы)</h4>
          <p>Просим Вас указать классных руководителей – лидеров Вашей ОО, рекомендуемых Вами для приглашения в
            экспертные группы ДОНМ (по 3 для каждой ступени образования)</p>

          <div class="row row-cols-lg-3 g-3 mt-4">
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">1. ФИО</label>
              <input type="text"
                     class="form-control"
                     id="person4fio"
                     required=""
                     v-model="formData.person4fio">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Должность</label>
              <input type="text"
                     class="form-control"
                     id="person4post"
                     required=""
                     v-model="formData.person4post">
            </div>
            <div></div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Стаж педагогической деятельности</label>
              <input type="text"
                     class="form-control"
                     id="person4experience"
                     required=""
                     v-model="formData.person4experience">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Адрес электронной почты</label>
              <input type="email"
                     class="form-control"
                     id="person4email"
                     required=""
                     v-model="formData.person4email">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Номер телефона</label>
              <input type="text"
                     class="form-control"
                     id="person4phone"
                     required=""
                     v-model="formData.person4phone">
            </div>
          </div>
          <div class="row row-cols-lg-3 g-3 mt-4">
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">2. ФИО</label>
              <input type="text"
                     class="form-control"
                     id="person5fio"
                     required=""
                     v-model="formData.person5fio">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Должность</label>
              <input type="text"
                     class="form-control"
                     id="person5post"
                     required=""
                     v-model="formData.person5post">
            </div>
            <div></div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Стаж педагогической деятельности</label>
              <input type="text"
                     class="form-control"
                     id="person5experience"
                     required=""
                     v-model="formData.person5experience">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Адрес электронной почты</label>
              <input type="email"
                     class="form-control"
                     id="person5email"
                     required=""
                     v-model="formData.person5email">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Номер телефона</label>
              <input type="text"
                     class="form-control"
                     id="person5phone"
                     required=""
                     v-model="formData.person5phone">
            </div>
          </div>
          <div class="row row-cols-lg-3 g-3 mt-4">
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">3. ФИО</label>
              <input type="text"
                     class="form-control"
                     id="person6fio"
                     required=""
                     v-model="formData.person6fio">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Должность</label>
              <input type="text"
                     class="form-control"
                     id="person6post"
                     required=""
                     v-model="formData.person6post">
            </div>
            <div></div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Стаж педагогической деятельности</label>
              <input type="text"
                     class="form-control"
                     id="person6experience"
                     required=""
                     v-model="formData.person6experience">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Адрес электронной почты</label>
              <input type="email"
                     class="form-control"
                     id="person6email"
                     required=""
                     v-model="formData.person6email">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Номер телефона</label>
              <input type="text"
                     class="form-control"
                     id="person6phone"
                     required=""
                     v-model="formData.person6phone">
            </div>
          </div>

          <br>

          <div class="row row-cols-lg-2 g-3">
            <div class="px-4">
              <button class="btn btn-info btn-lg w-100" type="submit" @click.prevent="backStep">
                Назад
              </button>
            </div>
            <div class="px-4">
              <button class="btn btn-primary btn-lg w-100" type="submit" @click.prevent="nextFourthStep">
                Далее
              </button>
            </div>
          </div>
        </form>

        <form
          id="survey-form-step-4"
          class="needs-validation"
          :class="{'was-validated': FourthStepFormValidated}"
          novalidate
          v-else-if="formStep === 4">
          <hr>
          <h4>Классный руководитель средней школы (1 -11 классы)</h4>
          <p>Просим Вас указать классных руководителей – лидеров Вашей ОО, рекомендуемых Вами для приглашения в
            экспертные группы ДОНМ (по 3 для каждой ступени образования)</p>

          <div class="row row-cols-lg-3 g-3 mt-4">
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">1. ФИО</label>
              <input type="text"
                     class="form-control"
                     id="person7fio"
                     required=""
                     v-model="formData.person7fio">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Должность</label>
              <input type="text"
                     class="form-control"
                     id="person7post"
                     required=""
                     v-model="formData.person7post">
            </div>
            <div></div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Стаж педагогической деятельности</label>
              <input type="text"
                     class="form-control"
                     id="person7experience"
                     required=""
                     v-model="formData.person7experience">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Адрес электронной почты</label>
              <input type="email"
                     class="form-control"
                     id="person7email"
                     required=""
                     v-model="formData.person7email">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Номер телефона</label>
              <input type="text"
                     class="form-control"
                     id="person7phone"
                     required=""
                     v-model="formData.person7phone">
            </div>
          </div>
          <div class="row row-cols-lg-3 g-3 mt-4">
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">2. ФИО</label>
              <input type="text"
                     class="form-control"
                     id="person8fio"
                     required=""
                     v-model="formData.person8fio">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Должность</label>
              <input type="text"
                     class="form-control"
                     id="person8post"
                     required=""
                     v-model="formData.person8post">
            </div>
            <div></div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Стаж педагогической деятельности</label>
              <input type="text"
                     class="form-control"
                     id="person8experience"
                     required=""
                     v-model="formData.person8experience">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Адрес электронной почты</label>
              <input type="email"
                     class="form-control"
                     id="person8email"
                     required=""
                     v-model="formData.person8email">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Номер телефона</label>
              <input type="text"
                     class="form-control"
                     id="person8phone"
                     required=""
                     v-model="formData.person8phone">
            </div>
          </div>
          <div class="row row-cols-lg-3 g-3 mt-4">
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">3. ФИО</label>
              <input type="text"
                     class="form-control"
                     id="person9fio"
                     required=""
                     v-model="formData.person9fio">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Должность</label>
              <input type="text"
                     class="form-control"
                     id="person9post"
                     required=""
                     v-model="formData.person9post">
            </div>
            <div></div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Стаж педагогической деятельности</label>
              <input type="text"
                     class="form-control"
                     id="person9experience"
                     required=""
                     v-model="formData.person9experience">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Адрес электронной почты</label>
              <input type="email"
                     class="form-control"
                     id="person9email"
                     required=""
                     v-model="formData.person9email">
            </div>
            <div class="mt-2">
              <label for="exampleInputEmail1" class="form-label">Номер телефона</label>
              <input type="text"
                     class="form-control"
                     id="person9phone"
                     required=""
                     v-model="formData.person9phone">
            </div>
          </div>

          <br>
          <div v-if="errorMessage !== ''">
            <div class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
            <hr class="my-4">
          </div>
          <button class="w-100 btn btn-primary btn-lg" type="submit" @click.prevent="sendSurveyAnswer">
            Отправить
          </button>
        </form>

        <div v-else-if="formStep === 5" class="text-center">
          <h3>Вы успешно прошли опрос, ответ записан!</h3>
          <h3>Спасибо!</h3>
        </div>
      </main>
    </div>

    <loading v-model:active="isLoading"
             loader="dots"
             :height="220"
             :width="160"
             color="#076DDA"
             :can-cancel="false"
             :is-full-page="true"/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'HomeView',
  components: {
    Loading
  },
  data () {
    return {
      surveySlug: 'homeroom-teacher',
      events: {
        events1: '',
        events2: '',
        events3: '',
        events4: '',
        events5: '',
        events6: ''
      },
      formData: {
        organizationName: '',
        criteria1: '',
        criteria2: '',
        criteria3: '',
        achievement1: '',
        achievement2: '',
        achievement3: '',
        events: '',
        person1fio: '',
        person1post: '',
        person1experience: '',
        person1email: '',
        person1phone: '',
        person2fio: '',
        person2post: '',
        person2experience: '',
        person2email: '',
        person2phone: '',
        person3fio: '',
        person3post: '',
        person3experience: '',
        person3email: '',
        person3phone: '',
        person4fio: '',
        person4post: '',
        person4experience: '',
        person4email: '',
        person4phone: '',
        person5fio: '',
        person5post: '',
        person5experience: '',
        person5email: '',
        person5phone: '',
        person6fio: '',
        person6post: '',
        person6experience: '',
        person6email: '',
        person6phone: '',
        person7fio: '',
        person7post: '',
        person7experience: '',
        person7email: '',
        person7phone: '',
        person8fio: '',
        person8post: '',
        person8experience: '',
        person8email: '',
        person8phone: '',
        person9fio: '',
        person9post: '',
        person9experience: '',
        person9email: '',
        person9phone: ''
      },
      FirstStepFormValidated: false,
      SecondStepFormValidated: false,
      ThirdStepFormValidated: false,
      FourthStepFormValidated: false,
      backgroundImageStyles: {
        opacity: 0.8
      },
      backgroundOverlayStyles: {
        'backdrop-filter': 'blur(1px)'
      }
    }
  },
  computed: {
    ...mapGetters(['formStep', 'surveyInfo', 'isLoading', 'errorMessage']),
    isRequiredEvent () {
      return !(this.formData.events1 ||
        this.formData.events2 ||
        this.formData.events3 ||
        this.formData.events4 ||
        this.formData.events5 ||
        this.formData.events)
    },
    eventsString () {
      const events = []
      if (this.events.events1) {
        events.push('Программы повышения квалификации')
      }
      if (this.events.events2) {
        events.push('Тренинги/семинары (в том числе выездные)')
      }
      if (this.events.events3) {
        events.push('Конкурсы профессионального мастерства')
      }
      if (this.events.events4) {
        events.push('Фестивали')
      }
      if (this.events.events5) {
        events.push('Профессиональные клубы для классных руководителей\n')
      }
      if (this.events.events6) {
        events.push(this.events.events6)
      }

      return events.join(', ')
    }
  },
  methods: {
    ...mapActions(['getSurveyInfo', 'saveAnswer']),
    ...mapMutations(['setFormStep']),
    backStep () {
      this.setFormStep(this.formStep - 1)
    },
    nextSecondStep () {
      const form = document.querySelector('#survey-form-step-1')
      this.FirstStepFormValidated = true
      if (!form.checkValidity()) {
        return
      }
      this.setFormStep(2)
    },
    nextThirdStep () {
      const form = document.querySelector('#survey-form-step-2')
      this.SecondStepFormValidated = true
      if (!form.checkValidity()) {
        return
      }
      this.setFormStep(3)
    },
    nextFourthStep () {
      const form = document.querySelector('#survey-form-step-3')
      this.ThirdStepFormValidated = true
      if (!form.checkValidity()) {
        return
      }
      this.setFormStep(4)
    },
    sendSurveyAnswer () {
      const form = document.querySelector('#survey-form-step-4')
      this.FourthStepFormValidated = true
      if (!form.checkValidity()) {
        return
      }
      this.saveAnswer(this.formData)
    }
  },
  watch: {
    errorMessage (message) {
      this.$toast.show(message, {
        type: 'error',
        position: 'top-right'
      })
    },
    formStep (step) {
      if (step === 5) {
        this.$toast.success('Вы успешно зарегистрировались!', {
          position: 'top-right'
        })
      }
    },
    events: {
      handler () {
        this.formData.events = this.eventsString
      },
      deep: true
    }
  },
  created () {
    this.getSurveyInfo(this.surveySlug)
  }
}
</script>
