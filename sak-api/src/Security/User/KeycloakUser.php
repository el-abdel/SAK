<?php

namespace App\Security\User;


use Symfony\Component\Security\Core\User\UserInterface;

class KeycloakUser implements UserInterface, \Serializable
{
    /**
     * @var string
     */
    private $sub;

    /**
     * @var string
     */
    private $locale;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $email;


    /**
     * @var string
     */
    private $given_name;


    /**
     * @var string
     */
    private $family_name;


    /**
     * @var string
     */
    private $preferred_username;

    /**
     * KeycloakUser constructor.
     * @param string $sub
     * @param string $locale
     * @param string $name
     * @param string $email
     * @param string $given_name
     * @param string $family_name
     * @param string $preferred_username
     */
    public function __construct(string $sub = '', string $locale = '', string $name = '', string $email = '', string $given_name = '', string $family_name = '', string $preferred_username = '')
    {
        $this->sub = $sub;
        $this->locale = $locale;
        $this->name = $name;
        $this->email = $email;
        $this->given_name = $given_name;
        $this->family_name = $family_name;
        $this->preferred_username = $preferred_username;
    }

    /**
     * @return string
     */
    public function getSub(): string
    {
        return $this->sub;
    }

    /**
     * @param string $sub
     */
    public function setSub(string $sub): void
    {
        $this->sub = $sub;
    }

    /**
     * @return string
     */
    public function getLocale(): string
    {
        return $this->locale;
    }

    /**
     * @param string $locale
     */
    public function setLocale(string $locale): void
    {
        $this->locale = $locale;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getGivenName(): string
    {
        return $this->given_name;
    }

    /**
     * @param string $given_name
     */
    public function setGivenName(string $given_name): void
    {
        $this->given_name = $given_name;
    }

    /**
     * @return string
     */
    public function getFamilyName(): string
    {
        return $this->family_name;
    }

    /**
     * @param string $family_name
     */
    public function setFamilyName(string $family_name): void
    {
        $this->family_name = $family_name;
    }

    /**
     * @param string $preferred_username
     */
    public function setPreferredUsername(string $preferred_username): void
    {
        $this->preferred_username = $preferred_username;
    }


    /**
     * Returns the roles granted to the user.
     *
     *     public function getRoles()
     *     {
     *         return ['ROLE_USER'];
     *     }
     *
     * Alternatively, the roles might be stored on a ``roles`` property,
     * and populated in any number of different ways when the user object
     * is created.
     *
     * @return (Role|string)[] The user roles
     */
    public function getRoles()
    {
        // TODO: Implement getRoles() method.
        return array('ROLE_API');
    }

    /**
     * Returns the password used to authenticate the user.
     *
     * This should be the encoded password. On authentication, a plain-text
     * password will be salted, encoded, and then compared to this value.
     *
     * @return string The password
     */
    public function getPassword()
    {
        // TODO: Implement getPassword() method.
        return $this->sub;
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
        // TODO: Implement getSalt() method.
        return null;
    }

    /**
     * Returns the username used to authenticate the user.
     *
     * @return string The username
     */
    public function getUsername()
    {
        // TODO: Implement getUsername() method.
        return $this->preferred_username;
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    /**
     * String representation of object
     * @link http://php.net/manual/en/serializable.serialize.php
     * @return string the string representation of the object or null
     * @since 5.1.0
     */
    public function serialize()
    {
        // TODO: Implement serialize() method.
        return serialize(array(
            $this->sub,
            $this->locale,
            $this->name,
            $this->email,
            $this->given_name,
            $this->family_name,
            $this->preferred_username
        ));
    }

    /**
     * Constructs the object
     * @link http://php.net/manual/en/serializable.unserialize.php
     * @param string $serialized <p>
     * The string representation of the object.
     * </p>
     * @return void
     * @since 5.1.0
     */
    public function unserialize($serialized)
    {
        // TODO: Implement unserialize() method.
        list (
            $this->sub,
            $this->locale,
            $this->name,
            $this->email,
            $this->given_name,
            $this->family_name,
            $this->preferred_username
            ) = unserialize($serialized, ['allowed_classes' => false]);
    }
}