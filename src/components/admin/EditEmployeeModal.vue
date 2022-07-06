<template>
  <BaseModal
    class="edit-modal"
    :show="showModal"
    header-text-class="text--white"
    header-bg-class="bg--gray"
    @update:show="onCancel"
  >
    <template #modal__header>
      <span>編輯會員資料</span>
    </template>
    <template #modal-text>
      <div class="grid grid-column-3 edit-employee-grid">
        <div class="left">
          <div class="flex flex-col">
            <img
              :src="imagePreviewUrl || picture"
              alt="Preview"
              width="110"
              height="110"
            >
            <label for="EmployeePicture">
              <input
                id="EmployeePicture"
                type="file"
                name="EmployeePicture"
                class="form-control-file"
                accept="image/*"
                @change="onPictureChange"
              >
            </label>
          </div>
        </div>
        <div>
          <label for="FirstName">
            <span class="form-label">First Name</span>
            <input
              id="FirstName"
              v-model="firstName"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="LastName">
            <span class="form-label">Last Name</span>
            <input
              id="LastName"
              v-model="lastName"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div class="wide">
          <label for="Birth">
            <span class="form-label">Birth</span>
            <input
              id="Birth"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="Email">
            <span class="form-label">Email</span>
            <input
              id="Email"
              v-model="email"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="Gender">
            <span class="form-label">Gender</span>
            <div class="flex justify-start items-center form-radio-group">
              <label for="GenderMale">
                <input
                  id="GenderMale"
                  v-model="gender"
                  type="radio"
                  name="gender-male"
                  value="male"
                >
                Male
              </label>
              <label for="GenderFemale">
                <input
                  id="GenderFemale"
                  v-model="gender"
                  class="ml-3"
                  type="radio"
                  name="gender-female"
                  value="female"
                >
                Female
              </label>
            </div>
          </label>
        </div>
        <div>
          <label for="Country">
            <span class="form-label">Country</span>
            <input
              id="Country"
              v-model="country"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="State">
            <span class="form-label">State</span>
            <input
              id="State"
              v-model="state"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="City">
            <span class="form-label">City</span>
            <input
              id="City"
              v-model="city"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="Street">
            <span class="form-label">Street</span>
            <input
              id="Street"
              v-model="street"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div>
          <label for="Phone">
            <span class="form-label">Number</span>
            <input
              id="Phone"
              v-model="phone"
              class="form-control"
              type="text"
            >
          </label>
        </div>
        <div />
        <div class="wide2">
          <div class="flex w-100">
            <span class="form-label">Coordinates</span>
          </div>
          <div class="flex w-100">
            <label
              class="flex-grow mr-2"
              for="Latitude"
            >
              <input
                id="Latitude"
                v-model="latitude"
                class="form-control"
                type="text"
              >
            </label>
            <label
              class="flex-grow ml-2"
              for="Longitude"
            >
              <input
                id="Longitude"
                v-model="longitude"
                class="form-control"
                type="text"
              >
            </label>
          </div>
        </div>
      </div>
      <div
        class="flex justify-center items-center mt-4"
      >
        <BaseButton
          class="mr-2"
          variant="primary"
          @click="onEdit"
        >
          確定
        </BaseButton>
        <BaseButton
          variant="gray"
          @click="onCancel"
        >
          取消
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue';
import { useEventBus } from '@vueuse/core';
import BaseModal from '../BaseModal.vue';
import BaseButton from '../BaseButton.vue';
import useEmployeeService from '../../composables/useEmployeeService';

const { emit } = useEventBus('notification-show');

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  employee: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['update:show']);

const { updateEmployeeById } = useEmployeeService();

const { show: showModal, employee } = toRefs(props);
const picture = ref('');
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const gender = ref('');
const country = ref('');
const state = ref('');
const city = ref('');
const street = ref('');
const phone = ref('');
const latitude = ref('');
const longitude = ref('');
const imagePreviewUrl = ref('');

watch(() => employee, (newValue) => {
  picture.value = newValue.value.picture.large;
  firstName.value = newValue.value.name.first;
  lastName.value = newValue.value.name.last;
  email.value = newValue.value.email;
  gender.value = newValue.value.gender;
  country.value = newValue.value.location.country;
  state.value = newValue.value.location.state;
  city.value = newValue.value.location.city;
  street.value = newValue.value.location.street.name;
  phone.value = newValue.value.cell;
  latitude.value = newValue.value.location.coordinates.latitude;
  longitude.value = newValue.value.location.coordinates.longitude;
}, { deep: true });

const onPictureChange = (e) => {
  const file = e.target.files[0];
  imagePreviewUrl.value = URL.createObjectURL(file);
};
const onEdit = () => {
  const { id } = employee.value;
  const data = {
    picture: {
      large: employee.value.picture.large,
    },
    name: {
      first: employee.value.name.first,
      last: employee.value.name.last,
    },
    email: employee.value.email,
    gender: employee.value.gender,
    location: {
      country: employee.value.location.country,
      state: employee.value.location.state,
      city: employee.value.location.city,
      coordinates: {
        latitude: employee.value.location.coordinates.latitude,
        longitude: employee.value.location.coordinates.longitude,
      },
    },
    street: {
      name: employee.value.location.street.name,
    },
    cell: employee.value.cell,
  };

  updateEmployeeById(id, data).then((res) => {
    const { error } = res;

    if (error.value) {
      emit({ type: 'danger', text: '更新失敗！' });
    } else {
      emits('update:show', false);
      emit({ type: 'success', text: '更新成功' });
    }
  });
};
const onCancel = () => {
  emits('update:show', false);
};
</script>

<style lang="scss" scoped>
.edit-employee-grid {
  max-width: 45rem;
  grid-template-areas:
    "left . ."
    "left wide wide"
    "left . ."
    "left . ."
    "left . ."
    "left . ."
    "left wide2 wide2";

  .wide {
    grid-area: wide;
  }

  .wide2 {
    grid-area: wide2;
  }

  .left {
    grid-area: left;
  }
}
</style>
