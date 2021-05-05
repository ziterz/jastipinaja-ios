import React from 'react';
import {Scene, Router, Actions, ActionConst} from 'react-native-router-flux';
import Onboarding from '../screens/onboarding/Onboarding';
import Login from '../screens/auth/Login';
import RegisterCustomer from '../screens/auth/RegisterCustomer';
import RegisterMerchant from '../screens/auth/RegisterMerchant';
import AlamatMerchant from '../screens/auth/AlamatMerchant';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import ListNotification from '../screens/notifikasi/ListNotification';
import CheckToken from '../utils/CheckToken';
import Splashscreen from '../screens/splashscreen/Splashscreen';
import ForgotPassword from '../screens/auth/ForgotPassword';
// customer
import HomeCustomer from '../screens/customer/home/home';
import HistoryComponenet from '../screens/customer/history/HistoryComponenet';
import KeranjangComponenet from '../screens/customer/keranjang/KeranjangComponenet';
import AkunCustomer from '../screens/customer/akun/AkunComponenet';
import DetailPesanan from '../screens/customer/keranjang/detail/DetailPesanan';
import JasaPengiriman from '../screens/customer/keranjang/detail/JasaPengiriman';
import JasaPackaging from '../screens/customer/keranjang/detail/JasaPackaging';
import UbahProfil from '../screens/customer/akun/UbahProfil';
import UbahAlamat from '../screens/customer/akun/UbahAlamat';
import DetailRekomendasi from '../screens/customer/home/DetailRekomendasi';
import RequestProduct from '../screens/customer/request/RequestProduct';
import DaftarRequest from '../screens/customer/request/DaftarRequest';
import DetailProduct from '../screens/customer/home/DetailProduk';
import SearchProduct from '../screens/customer/home/SearchProduct';
import Midtrans from '../screens/customer/transaction/midtrans';
import RincianPesanan from '../screens/customer/history/rincian/RincianPesanan';
import RincianMidtrans from '../screens/customer/history/rincian/Midtrans';
import PilihAlamat from '../screens/customer/keranjang/detail/PilihAlamat';
// merchants
import HomeMerchant from '../screens/merchant/home/HomeComponenet';
import HistoryMerchant from '../screens/merchant/history/HistoryComponenet';
import AkunMerchant from '../screens/merchant/akun/AkunComponenet';
import ListProduk from '../screens/merchant/produk/list/ListProduk';
import TambahProduk from '../screens/merchant/produk/detail/TambahProduk';
import EditProduk from '../screens/merchant/produk/detail/EditProduk';
import { Platform, StatusBar } from 'react-native';
// import UbahProfilMerchant from '../screens/merchant/akun/UbahProfil';
// import UbahAlamatMerchant from '../screens/merchant/akun/UbahAlamat';

const Route = () => {
  return (
    <Router>
      <Scene key="root">
        {/* <Scene
          title="CheckToken"
          key="checkToken"
          component={CheckToken}
          hideNavBar
          initial
        /> */}
        <Scene
          key="splashscreen"
          title="Splash Screen"
          component={Splashscreen}
          type={ActionConst.RESET}
          hideNavBar
          initial
        />
        <Scene
          key="viewPager"
          title="View Pager"
          component={Onboarding}
          type={ActionConst.RESET}
          hideNavBar
        />

        <Scene
          type="reset"
          key="login"
          title="Login"
          component={Login}
          onEnter={() => Actions.refs.login?.onEnter()}
          onExit={() => Actions.refs.login?.onExit()}
          hideNavBar
        />

        <Scene
          // type="reset"
          key="forgot"
          title="Lupa Kata Sandi"
          component={ForgotPassword}
          back
        />

        <Scene
          key="registercustomer"
          title="Daftar Customer"
          component={RegisterCustomer}
          back
        />
        <Scene
          key="registerMerchant"
          title="Daftar Merchant"
          component={RegisterMerchant}
          back
        />
        <Scene
          key="alamatMerchant"
          title="Daftar Merchant - Step 2"
          component={AlamatMerchant}
          back
        />
        <Scene
          key="detailRekomendasi"
          title="Semua Produk"
          component={DetailRekomendasi}
          back
        />
        <Scene
          key="detailProduct"
          component={DetailProduct}
          hideNavBar={true}
          back
        />
        <Scene
          key="midtrans"
          title="Midtrans"
          component={Midtrans}
          hideNavBar
          back
        />
       
        {/* bottom navbar customer */}
        <Scene
          key="bottomNavbarCustomer"
          tabBarPosition="botttom"
          activeTintColor="#01579B"
          inActiveTintColor="#C4C4C4"
          tabBarStyle={{
            backgroundColor: '#FFFFFF',
            height: 55,
            paddingVertical: 8 ,
            marginBottom: 5,
          }}
          labelStyle={{fontSize: 12}}
          titleStyle={{
            fontSize: 18,
          }}
          type="reset"
          upperCaseLabel={false}
          tabs
          hideNavBar>
          <Scene
            key="homeCustomer"
            component={HomeCustomer}
            title="Home"
            icon={({tintColor}) => (
              <Icon name="home" size={20} color={tintColor} />
            )}
            type="reset"
            hideNavBar
            onBack={() => console.log('back')}
            tabBarOnPress={() => Actions.refs.homeCustomer?.scrollToTop()}
            onEnter={() => Actions.refs.homeCustomer?.onEnter()}
            onExit={() => Actions.refs.homeCustomer?.onExit()}
          />
          <Scene
            key="history"
            component={HistoryComponenet}
            title="History"
            icon={({tintColor}) => (
              <IconMaterial name="assignment" size={20} color={tintColor} />
            )}
            onEnter={() => Actions.refs.history?.onEnter()}
          />
          <Scene
            key="keranjang"
            component={KeranjangComponenet}
            title="Keranjang"
            icon={({tintColor}) => (
              <Icon name="shopping-cart" size={20} color={tintColor} />
            )}
            onEnter={() => Actions.refs.keranjang?.onEnter()}
          />
          <Scene
            key="akunCustomer"
            component={AkunCustomer}
            title="Akun saya"
            icon={({tintColor}) => (
              <IconMaterial name="account-circle" size={20} color={tintColor} />
            )}
          />
        </Scene>
        {/* end bottom navbar customer*/}
        {/* bottom navbar merchant */}
        <Scene
          key="bottomNavbarMerchant"
          tabBarPosition="botttom"
          activeTintColor="#01579B"
          inActiveTintColor="#C4C4C4"
          tabBarStyle={{
            backgroundColor: '#FFFFFF',
            height: 55,
            paddingVertical: 8,
            marginBottom: 5,
          }}
          labelStyle={{fontSize: 12}}
          titleStyle={{
            fontSize: 18,
          }}
          upperCaseLabel={false}
          type="reset"
          tabs
          hideNavBar>
          <Scene
            key="homeMerchant"
            component={HomeMerchant}
            title="Home"
            icon={({tintColor}) => (
              <Icon name="store-alt" size={15} color={tintColor} />
            )}
            type="reset"
            onEnter={() => Actions.refs.homeMerchant?.onEnter()}
            onExit={() => Actions.refs.homeMerchant?.onExit()}
            hideNavBar
          />

          <Scene
            key="historyMerchant"
            component={HistoryMerchant}
            title="History"
            onEnter={() => Actions.refs.historyMerchant?.onEnter()}
            icon={({tintColor}) => (
              <IconMaterial name="assignment" size={20} color={tintColor} />
            )}
          />
          <Scene
            key="produk"
            component={ListProduk}
            title="Daftar Produk"
            onEnter={() => Actions.refs.listProduk?.onEnter()}
            icon={({tintColor}) => (
              <IconMaterial
                name="business-center"
                size={20}
                color={tintColor}
              />
            )}
            renderRightButton={
              <Icon
                name="plus"
                size={20}
                style={{marginRight: 28}}
                onPress={() => Actions.tambahProduk()}
              />
            }
          />

          <Scene
            key="akunCustomer"
            component={AkunCustomer}
            title="Akun"
            icon={({tintColor}) => (
              <IconMaterial name="account-circle" size={20} color={tintColor} />
            )}
          />
        </Scene>
        {/* end bottom navbar merchant*/}
        <Scene
          key="detailPesanan"
          title="Detail Pesanan"
          component={DetailPesanan}
          back
        />
        <Scene
          key="notifications"
          title="Notifikasi"
          component={ListNotification}
          back
        />
        <Scene
          key="requestProduct"
          title="Request Produk"
          component={RequestProduct}
          renderRightButton={
            <Icon
              name="list-alt"
              size={20}
              style={{marginRight: 20}}
              onPress={() => Actions.daftarRequest()}
            />
          }
          back
        />
        <Scene
          key="daftarRequest"
          title="Request Produk"
          component={DaftarRequest}
          back
        />
        <Scene
          key="jasaPengiriman"
          title="Pilih Jasa Pengiriman"
          component={JasaPengiriman}
          back
        />
        <Scene
          key="jasaPackaging"
          title="Pilih Packaging"
          component={JasaPackaging}
          back
        />
        <Scene
          key="ubahProfil"
          title="Ubah Profil"
          component={UbahProfil}
          back
        />
        <Scene
          key="ubahAlamat"
          title="Ubah Alamat"
          component={UbahAlamat}
          back
        />
        <Scene
          key="tambahProduk"
          title="Tambah Produk"
          component={TambahProduk}
          back
        />
        <Scene
          key="editProduk"
          title="Edit Produk"
          component={EditProduk}
          back
        />
        <Scene
          key="rincian"
          title="Rincian Pesanan"
          component={RincianPesanan}
        />
        <Scene
          key="rincianMidtrans"
          title="Pembayaran"
          component={RincianMidtrans}
          hideNavBar
          back
        />
        <Scene
          key="search"
          title="Detail Product"
          component={SearchProduct}
          onEnter={Actions.refs.searchProduct?.onEnter()}
          hideNavBar
        />
        <Scene
          key="pilihAlamat"
          title="Alamat Pengiriman"
          component={PilihAlamat}
          onBack={() => Actions.refs.pilihAlamat?.onBack()}
          back
          // back={Actions.replace("detailPesanan")}
        />
      </Scene>
    </Router>
  );
};

export default Route;
