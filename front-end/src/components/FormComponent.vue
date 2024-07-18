<template>
  <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">

      <div class="flex flex-col mb-4">
        <Field placeholder="First Name" name="firstName" type="text" class="border border-black p-2 rounded-lg w-80" :class="{
          'is-invalid':errors.firstName }" />
        <div class="text-red-500">{{errors.firstName}}</div>
      </div>

      <div class="flex flex-col mb-4">
        <Field placeholder="Last Name" name="lastName" type="text" class="border border-black p-2 rounded-lg w-80" :class="{
          'is-invalid':errors.lastName }" />
        <div class="text-red-500">{{errors.lastName}}</div>
      </div>

      <div class="flex flex-col mb-4">
        <Field name="email" type="text" placeholder="Email" class="border border-black p-2 rounded-lg w-80" :class="{
          'is-invalid': errors.email }" />
        <div class="text-red-500">{{errors.email}}</div>
      </div>

      <div class="flex flex-col mb-4">
        <Field placeholder="Phone number" name="phone" type="number" class="border border-black p-2 rounded-lg w-80" :class="{ 'is-invalid':
        errors.phone }" />
        <div class="text-red-500">{{errors.phone}}</div>
      </div>


      <div class="flex flex-col mb-4">
        <Field placeholder="Street"  name="street" type="text" class="border border-black p-2 rounded-lg w-80"
               :class="{ 'is-invalid': errors.street }" />
        <div class="text-red-500">{{errors.street}}</div>
      </div>

      <div class="flex flex-col mb-4">
        <Field placeholder="Postal Code"  name="postalCode" type="text"
               class="border border-black p-2 rounded-lg w-80" :class="{ 'is-invalid': errors.postalCode }" />
        <div class="text-red-500">{{errors.postalCode}}</div>
      </div>

      <div class="flex flex-col mb-4">
        <Field placeholder="City"  name="city" type="text" class="border border-black p-2 rounded-lg w-80" :class="{
          'is-invalid': errors.city }" />
        <div class="text-red-500">{{errors.city}}</div>
      </div>

    <div class="flex flex-col mb-4">
      <div class="flex items-center gap-2">
        <Field name="acceptTerms" type="checkbox" id="acceptTerms" value="true" class="w-5 h-5" :class="{ 'is-invalid': errors.acceptTerms }" />
        <label for="acceptTerms" class="">Terms & Conditions</label>
      </div>
      <div class="text-red-500">{{errors.acceptTerms}}</div>
    </div>

    <button class="w-80" type="submit">Buy</button>

  </Form>
</template>


<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import {useCartStore} from "../../stores/cartStore";
import router from "@/router";


const schema = Yup.object().shape({
  firstName: Yup.string()
      .required('First Name is required'),
  lastName: Yup.string()
      .required('Last name is required'),
  email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  phone: Yup.string('Phone number is required')
      .required()
      .matches(/^\d{9}$/, 'Phone number must contains 9 digits'),
  street: Yup.string()
      .required('Street name is required'),
  postalCode: Yup.string()
      .required('Postal code is required')
      .matches(/^\d{2}-\d{3}$/, 'Postal code must be in xx-xxx format'),
  city: Yup.string()
      .required('City is required'),
  acceptTerms: Yup.string()
      .required('Accept our terms is required')
});

const cartStore = useCartStore();

async function onSubmit(values) {
  // alert('\n\n' + JSON.stringify(values, null, 4));
  await cartStore.updateStock();
  await cartStore.flushCart();
  router.push({name: 'confirmation'});
}

</script>

